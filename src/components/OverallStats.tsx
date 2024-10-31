import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

interface OverallStatsProps {
  attendance: number;
}

export function OverallStats({ attendance }: OverallStatsProps) {
  const getProgressColor = () => {
    if (attendance >= 75) return '#10B981'; // green
    if (attendance >= 65) return '#F59E0B'; // yellow
    return '#EF4444'; // red
  };

  const getStatusIcon = () => {
    if (attendance >= 75) {
      return <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />;
    }
    return <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />;
  };

  const getStatusMessage = () => {
    if (attendance >= 75) {
      return 'Great! You\'re maintaining good attendance';
    }
    if (attendance >= 65) {
      return 'Warning: Attendance needs improvement';
    }
    return 'Critical: Attendance below requirement';
  };

  const circumference = 283;
  const strokeDasharray = `${(attendance / 100) * circumference} ${circumference}`;

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Overall Attendance</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Across all subjects</p>
        </div>
        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
      </div>
      
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="10"
              className="opacity-25"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={getProgressColor()}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              className="transition-all duration-500 ease-out"
              style={{ 
                transformOrigin: 'center',
                transform: 'rotate(-90deg)',
                strokeDashoffset: 0
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-bold" style={{ color: getProgressColor() }}>
                {attendance}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-2">
            {getStatusIcon()}
            <span className="font-medium" style={{ color: getProgressColor() }}>
              {attendance >= 75 ? 'On Track' : 'Needs Attention'}
            </span>
          </div>
          
          <p className="text-gray-600 text-xs sm:text-sm mb-4">
            {getStatusMessage()}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
              <div className="text-xs sm:text-sm text-gray-500">Required</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">75%</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
              <div className="text-xs sm:text-sm text-gray-500">Current</div>
              <div className="font-semibold text-sm sm:text-base" style={{ color: getProgressColor() }}>
                {attendance}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}