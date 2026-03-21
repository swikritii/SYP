import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, Calendar, ArrowRight } from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import Button from '../../components/common/Button';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Confirming your payment with eSewa...');

  useEffect(() => {
    const verify = async () => {
      // eSewa v2 sends ?data=... (base64) in the success_url
      const data = searchParams.get('data');

      if (!data) {
        setStatus('error');
        setMessage('Missing payment verification data. Please contact support.');
        return;
      }

      try {
        const res = await apiClient.get(`/payments/verify?data=${encodeURIComponent(data)}`);
        if (res.success) {
          setStatus('success');
          setMessage('Your booking has been successfully confirmed via eSewa!');
        } else {
          setStatus('error');
          setMessage(res.message || 'Payment verification failed.');
        }
      } catch (err) {
        setStatus('error');
        setMessage(err.message || 'An error occurred during verification.');
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-gray-50/50">
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 text-center max-w-lg w-full transition-all">

        {status === 'verifying' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Verifying Payment</h1>
            <p className="text-gray-500">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-gray-900 leading-tight">Match Confirmed!</h1>
              <p className="text-gray-500 text-lg">{message}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-left">
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>Check your "My Bookings" for your receipt.</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button onClick={() => navigate('/dashboard')} className="w-full py-4 shadow-lg shadow-indigo-100">
                Go to Dashboard
              </Button>
              <Button variant="secondary" onClick={() => navigate('/browse-courts')} className="w-full flex items-center justify-center gap-2">
                Book Another Match <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Failed</h1>
            <p className="text-red-500 bg-red-50 py-3 px-4 rounded-xl border border-red-100">{message}</p>

            <div className="flex flex-col gap-3 pt-4">
              <Button onClick={() => navigate('/browse-courts')} className="w-full">
                Try Booking Again
              </Button>
              <Button variant="secondary" onClick={() => navigate('/dashboard')} className="w-full">
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
