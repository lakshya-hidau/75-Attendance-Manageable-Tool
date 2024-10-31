import React from 'react';
import { Header } from './components/Header';
import { SubjectCard } from './components/SubjectCard';
import { QuickTips } from './components/QuickTips';
import { useSubjects } from './hooks/useSubjects';
import { OverallStats } from './components/OverallStats';

export default function App() {
  const {
    subjects,
    addSubject,
    updateSubject,
    deleteSubject,
    calculateOverallAttendance,
    lastAddedId,
  } = useSubjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
        <Header />
        <OverallStats attendance={calculateOverallAttendance()} />

        <div className="space-y-4 sm:space-y-6">
          {subjects.map(subject => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onUpdate={updateSubject}
              onDelete={deleteSubject}
              isNew={subject.id === lastAddedId}
            />
          ))}
        </div>

        <button
          onClick={addSubject}
          className="w-full py-2.5 sm:py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium text-sm sm:text-base"
        >
          Add New Subject
        </button>

        <QuickTips />
      </div>
    </div>
  );
}