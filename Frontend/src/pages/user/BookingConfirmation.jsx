import React, { useState } from 'react';
import { CheckCircle, CreditCard, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/common/Button';
import { apiClient } from '../../services/apiClient';

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;
  const isFreeReward = booking?.is_free_reward;
  const amount = booking?.total_amount || 0;
  const [loading, setLoading] = useState(false);

  const handleEsewaPayment = async () => {
    try {
      setLoading(true);
      const res = await apiClient.post('/payments/initiate', {
        booking_id: booking.bookingId,
        amount: amount
      });

      if (res.success) {
        const { payment_config } = res;
        
        // eSewa v2 requires an HTML Form POST
        const form = document.createElement('form');
        form.setAttribute('method', 'POST');
        form.setAttribute('action', payment_config.esewa_url);

        for (const key in payment_config) {
            if (key !== 'esewa_url') {
                const input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', key);
                input.setAttribute('value', payment_config[key]);
                form.appendChild(input);
            }
        }

        document.body.appendChild(form);
        form.submit();
      }
    } catch (err) {
      alert(err.message || 'Failed to initiate eSewa payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-gray-50/50">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 scale-in-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Reserved!</h1>
        <p className="text-gray-500 mb-8">
            Your slot has been reserved. {isFreeReward ? 'Enjoy your free match!' : 'Please complete the payment to confirm your booking.'}
        </p>
        
        {isFreeReward ? (
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl mb-8 shadow-lg relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-24 h-24" />
                </div>
                <h3 className="font-bold text-xl mb-2 flex items-center justify-center gap-2">🎉 10th Match Free!</h3>
                <p className="text-sm text-green-50 opacity-90">Congratulations! As a loyal player, this booking is completely free of charge.</p>
            </div>
        ) : (
            <div className="bg-green-50 border border-green-100 p-6 rounded-2xl mb-8">
                <div className="text-sm text-green-600 font-semibold uppercase tracking-wider mb-1">Amount Due</div>
                <div className="text-4xl font-black text-green-900 mb-4">Rs. {amount}</div>
                <button 
                    onClick={handleEsewaPayment}
                    disabled={loading}
                    className="w-full bg-[#60bb46] hover:bg-[#50a03a] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md disabled:opacity-50"
                >
                    {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                        <>
                            <CreditCard className="w-5 h-5" />
                            Pay with eSewa
                        </>
                    )}
                </button>
                <p className="text-[10px] text-gray-400 mt-3">Secure payment powered by eSewa Gateway</p>
            </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="secondary" onClick={() => navigate('/dashboard')} className="flex-1">
            Skip for now
          </Button>
          <Button onClick={() => navigate('/browse-courts')} className="flex-1 group">
            Browse More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
