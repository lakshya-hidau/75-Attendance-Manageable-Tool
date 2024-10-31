import React from 'react';
import { Calculator } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-3 sm:mb-4">
        <Calculator className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Subject-wise Attendance</h1>
      <p className="text-sm sm:text-base text-gray-600">Track attendance for each subject to maintain 75% requirement</p>
    </div>
  );
}