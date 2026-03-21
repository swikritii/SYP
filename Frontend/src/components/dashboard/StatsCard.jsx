import React from 'react';

export default function StatsCard({ title, value, icon: Icon, trend, color = 'indigo' }) {
  const colorClasses = {
    indigo: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
    green: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    blue: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
    orange: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200',
    amber: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    red: 'bg-red-50 text-red-700 ring-1 ring-red-200',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
      <div className="flex items-center justify-between mb-5">
        <div className={`p-3.5 rounded-xl transition-transform group-hover:scale-110 duration-300 ${colorClasses[color] || colorClasses.indigo}`}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        {trend && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              trend > 0
                ? 'bg-green-50 text-green-600'
                : 'bg-red-50 text-red-600'
            }`}
          >
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
