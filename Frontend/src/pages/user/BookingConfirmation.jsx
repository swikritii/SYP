import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const isFreeReward = location.state?.booking?.is_free_reward;

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-4">
          Your court has been successfully booked. Check your dashboard for details.
        </p>
        
        {isFreeReward && (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-8 border border-green-200 shadow-sm">
                <h3 className="font-bold text-lg mb-1">🎉 10th Match Free Reward!</h3>
                <p className="text-sm">Congratulations! This booking was automatically free because it is your 10th booking with FutsalFlow.</p>
            </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
          <Button variant="secondary" onClick={() => navigate('/browse-courts')}>Browse More Courts</Button>
        </div>
      </div>
    </div>
  );
}
