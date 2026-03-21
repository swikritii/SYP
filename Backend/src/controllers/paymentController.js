const { pool } = require('../db');
const crypto = require('crypto');

/**
 * eSewa Payment Gateway (v2 UAT)
 */
const ESEWA_CONFIG = {
    merchant_id: 'EPAYTEST',
    secret_key: '8gBm/:&EnhH.1/q', // Correct v2 UAT Key
    uat_endpoint: 'https://rc-epay.esewa.com.np/api/epay/main/v2/form',
    verification_endpoint: 'https://rc-epay.esewa.com.np/api/epay/transaction/status'
};

exports.initiatePayment = async (req, res) => {
    try {
        const { booking_id, amount } = req.body;
        const userId = req.user.id;

        const [booking] = await pool.query(
            'SELECT * FROM bookings WHERE id = ? AND user_id = ?',
            [booking_id, userId]
        );
        if (booking.length === 0) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        // eSewa v2 UAT - "Guaranteed Signature" Protocol
        const amountNum = Math.round(Number(amount));
        const amountString = amountNum.toString(); 
        
        // PURE NUMERIC UUID for maximum stability
        const transaction_uuid = `${Date.now()}${booking_id}`;
        const product_code = 'EPAYTEST';

        const signed_field_names = 'total_amount,transaction_uuid,product_code';
        const signatureMessage = `total_amount=${amountString},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

        const signature = crypto
            .createHmac('sha256', ESEWA_CONFIG.secret_key)
            .update(signatureMessage)
            .digest('base64');

        console.log('=== eSewa Signature Debug ===');
        console.log('Message:', signatureMessage);
        console.log('Signature:', signature);
        console.log('=============================');

        await pool.query(
            'INSERT INTO payments (booking_id, amount, status, payment_method, transaction_id) VALUES (?, ?, ?, ?, ?)',
            [booking_id, amountNum, 'pending', 'eSewa', transaction_uuid]
        );

        res.json({
            success: true,
            payment_config: {
                amount: amountString,
                tax_amount: '0',
                total_amount: amountString,
                transaction_uuid,
                product_code,
                product_service_charge: '0',
                product_delivery_charge: '0',
                success_url: `http://localhost:5173/payment-success`,
                failure_url: 'http://localhost:5173/payment-failure',
                signed_field_names,
                signature,
                esewa_url: ESEWA_CONFIG.uat_endpoint
            }
        });

    } catch (err) {
        console.error('eSewa initiate error:', err);
        res.status(500).json({ success: false, message: 'Failed to initiate payment' });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { data } = req.query;
        if (!data) {
            return res.status(400).json({ success: false, message: 'Missing payment data' });
        }

        const decodedString = Buffer.from(data, 'base64').toString('utf8');
        const paymentData = JSON.parse(decodedString);

        console.log('=== eSewa Verify Response ===');
        console.log(paymentData);

        if (paymentData.status !== 'COMPLETE') {
            return res.status(400).json({ success: false, message: 'Payment not completed' });
        }

        // Search by transaction_uuid (our internal ID) OR transaction_code (eSewa ID)
        // This makes the verification idempotent if call is repeated
        const [payment] = await pool.query(
            'SELECT * FROM payments WHERE transaction_id = ? OR transaction_id = ?',
            [paymentData.transaction_uuid, paymentData.transaction_code]
        );

        if (payment.length === 0) {
            console.error('Record lookup failed for UUID:', paymentData.transaction_uuid);
            return res.status(404).json({ success: false, message: 'Payment record not found' });
        }

        const bookingId = payment[0].booking_id;
        
        // If already completed, just return success (Idempotency)
        if (payment[0].status === 'completed') {
            return res.json({ success: true, message: 'Payment already verified' });
        }

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            // Update to completed and record the final eSewa transaction_code
            await connection.query(
                'UPDATE payments SET status = ?, transaction_id = ? WHERE transaction_id = ?',
                ['completed', paymentData.transaction_code, paymentData.transaction_uuid]
            );
            await connection.query(
                'UPDATE bookings SET status = ? WHERE id = ?',
                ['confirmed', bookingId]
            );
            await connection.commit();
            res.json({ success: true, message: 'Payment verified and booking confirmed' });
        } catch (dbErr) {
            await connection.rollback();
            throw dbErr;
        } finally {
            connection.release();
        }
    } catch (err) {
        console.error('eSewa verification error:', err);
        res.status(500).json({ success: false, message: 'Verification failed' });
    }
};