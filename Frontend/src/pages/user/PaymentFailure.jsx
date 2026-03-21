import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, AlertCircle } from 'lucide-react';
import Button from '../../components/common/Button';

export default function PaymentFailure() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-red-50 text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-black text-gray-900 mb-2">Payment Cancelled</h1>
        <p className="text-gray-500 mb-8 text-lg">Your transaction with eSewa was not completed. No funds were deducted from your account.</p>
        
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 text-left mb-8">
            <div className="flex gap-4">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <div className="space-y-1">
                    <h4 className="font-bold text-amber-900">What happened?</h4>
                    <p className="text-sm text-amber-800 opacity-80">You may have closed the payment window or the session timed out. You can try the payment again from your booking confirmation page.</p>
                </div>
            </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <Button onClick={() => navigate('/browse-courts')} className="w-full py-4 shadow-lg shadow-red-100 bg-red-600 hover:bg-red-700">
            Re-book Match
          </Button>
          <Button variant="secondary" onClick={() => navigate('/dashboard')} className="w-full">
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
