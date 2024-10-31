import React, { useRef, useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Trash2 } from 'lucide-react';
import { Subject } from '../types';

interface SubjectCardProps {
  subject: Subject;
  onUpdate: (updatedSubject: Subject) => void;
  onDelete: (id: string) => void;
  isNew?: boolean;
}

export function SubjectCard({ subject, onUpdate, onDelete, isNew }: SubjectCardProps) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const totalClassesInputRef = useRef<HTMLInputElement>(null);
  const attendedClassesInputRef = useRef<HTMLInputElement>(null);

  const percentage = subject.totalClasses > 0
    ? Number(((subject.attendedClasses / subject.totalClasses) * 100).toFixed(2))
    : 0;

  useEffect(() => {
    if (isNew && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isNew]);

  const getStatusColor = () => {
    if (percentage >= 75) return 'text-green-500';
    if (percentage >= 65) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusMessage = () => {
    if (subject.totalClasses === 0) {
      return (
        <div className="flex items-center gap-2 text-gray-500">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Enter total classes to see status</span>
        </div>
      );
    }

    // Calculate classes needed for 75% attendance
    const currentTotal = subject.totalClasses;
    const currentAttended = subject.attendedClasses;
    
    // Calculate how many more classes are needed while considering future classes
    let additionalClassesNeeded = 0;
    let totalClassesNeeded = currentTotal;
    
    while ((currentAttended + additionalClassesNeeded) / totalClassesNeeded < 0.75) {
      additionalClassesNeeded++;
      totalClassesNeeded++;
    }

    if (percentage >= 75) {
      // Calculate how many classes can be missed while maintaining 75%
      let missableClasses = 0;
      let tempTotal = currentTotal;
      let tempAttended = currentAttended;
      
      while (((tempAttended) / (tempTotal + 1)) >= 0.75) {
        missableClasses++;
        tempTotal++;
      }

      return (
        <div className="flex items-center gap-2 text-green-500">
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>
            {missableClasses > 0 
              ? `You can miss next ${missableClasses} ${missableClasses === 1 ? 'class' : 'classes'}`
              : 'Maintain attendance to stay above 75%'}
          </span>
        </div>
      );
    }

    if (additionalClassesNeeded > 0) {
      const newTotal = totalClassesNeeded;
      return (
        <div className="flex items-center gap-2 text-red-500">
          <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>
            Need to attend next {additionalClassesNeeded} {additionalClassesNeeded === 1 ? 'class' : 'classes'} 
            (Total will be {newTotal})
          </span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 text-yellow-500">
        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Attendance below requirement</span>
      </div>
    );
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    nextRef: React.RefObject<HTMLInputElement> | null
  ) => {
    if (e.key === 'Enter' && nextRef?.current) {
      e.preventDefault();
      nextRef.current.focus();
    }
  };

  const handleTotalClassesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // If the input is empty or not a number, set total to 0 but keep attended classes
    if (newValue === '' || isNaN(parseInt(newValue))) {
      onUpdate({
        ...subject,
        totalClasses: 0,
        // Keep attended classes as is, they'll be adjusted if needed when a new total is entered
        attendedClasses: subject.attendedClasses
      });
      return;
    }

    const totalClasses = Math.max(0, parseInt(newValue));
    
    // Only adjust attended classes if the new total is less than current attended
    const newAttendedClasses = totalClasses < subject.attendedClasses 
      ? totalClasses 
      : subject.attendedClasses;

    onUpdate({
      ...subject,
      totalClasses,
      attendedClasses: newAttendedClasses
    });
  };

  const handleAttendedClassesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // If the input is empty or not a number, set attended to 0
    if (newValue === '' || isNaN(parseInt(newValue))) {
      onUpdate({
        ...subject,
        attendedClasses: 0
      });
      return;
    }

    const attendedClasses = Math.max(0, parseInt(newValue));
    
    onUpdate({
      ...subject,
      attendedClasses: Math.min(attendedClasses, subject.totalClasses)
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-6 transform transition-all duration-200 hover:shadow-xl">
      <div className="flex justify-between items-center">
        <input
          ref={nameInputRef}
          type="text"
          value={subject.name}
          onChange={(e) => onUpdate({ ...subject, name: e.target.value })}
          onKeyDown={(e) => handleKeyDown(e, totalClassesInputRef)}
          className="text-lg sm:text-xl font-semibold text-gray-900 bg-transparent border-b-2 border-transparent hover:border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors duration-200"
          placeholder="Subject Name"
        />
        <button
          onClick={() => onDelete(subject.id)}
          className="p-1.5 sm:p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
          title="Remove subject"
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
            Total Classes
          </label>
          <input
            ref={totalClassesInputRef}
            type="number"
            inputMode="numeric"
            min="0"
            value={subject.totalClasses || ''}
            onChange={handleTotalClassesChange}
            onKeyDown={(e) => handleKeyDown(e, attendedClassesInputRef)}
            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
            Classes Attended
          </label>
          <input
            ref={attendedClassesInputRef}
            type="number"
            inputMode="numeric"
            min="0"
            max={subject.totalClasses}
            value={subject.attendedClasses || ''}
            onChange={handleAttendedClassesChange}
            onKeyDown={(e) => handleKeyDown(e, null)}
            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="0"
          />
        </div>
      </div>

      <div className="pt-3 sm:pt-4 border-t border-gray-200">
        <div className="text-center mb-3 sm:mb-4">
          <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">
            <span className={getStatusColor()}>{percentage}%</span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <div className="text-xs sm:text-sm">{getStatusMessage()}</div>
        </div>
      </div>
    </div>
  );
}