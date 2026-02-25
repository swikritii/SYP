import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function BookingConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-8">
          Your court has been successfully booked. Check your dashboard for details.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
          <Button variant="secondary" onClick={() => navigate('/browse-courts')}>Browse More Courts</Button>
        </div>
      </div>
    </div>
  );
}
