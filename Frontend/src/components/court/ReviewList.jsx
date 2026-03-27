import React from 'react';
import { Star, UserCircle2 } from 'lucide-react';

export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
        <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h4 className="text-lg font-medium text-gray-900 mb-1">No Reviews Yet</h4>
        <p className="text-gray-500">Be the first to share your experience at this court.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
        Player Reviews ({reviews.length})
      </h3>
      
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm transition-hover hover:border-indigo-100">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                  <UserCircle2 className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{review.user_name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.created_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex bg-yellow-50 px-2 py-1 rounded-lg">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {review.comment && (
              <p className="text-gray-700 leading-relaxed mt-2 text-sm">
                {review.comment}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
