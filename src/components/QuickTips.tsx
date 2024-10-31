import React from 'react';
import { Calendar } from 'lucide-react';

export function QuickTips() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-gray-900 text-sm sm:text-base">Quick Tips</h3>
          <ul className="mt-2 text-xs sm:text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Maintain at least 75% attendance in each subject</li>
            <li>Regular attendance helps in better understanding</li>
            <li>Track attendance regularly to avoid last-minute issues</li>
            <li>Add all your subjects to get a complete overview</li>
          </ul>
        </div>
      </div>
    </div>
  );
}