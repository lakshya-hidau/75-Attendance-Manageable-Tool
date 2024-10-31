import { useState, useEffect } from 'react';
import { Subject } from '../types';

const STORAGE_KEY = 'attendance-subjects';

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [{
      id: '1',
      name: '',
      totalClasses: 0,
      attendedClasses: 0,
    }];
  });

  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: '',
      totalClasses: 0,
      attendedClasses: 0,
    };
    setSubjects([...subjects, newSubject]);
    setLastAddedId(newSubject.id);
  };

  const updateSubject = (updatedSubject: Subject) => {
    setSubjects(subjects.map(subject => 
      subject.id === updatedSubject.id ? updatedSubject : subject
    ));
    if (updatedSubject.id === lastAddedId) {
      setLastAddedId(null);
    }
  };

  const deleteSubject = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
    if (id === lastAddedId) {
      setLastAddedId(null);
    }
  };

  const calculateOverallAttendance = () => {
    const validSubjects = subjects.filter(s => s.totalClasses > 0);
    if (validSubjects.length === 0) return 0;

    const totalPercentage = validSubjects.reduce((acc, subject) => {
      return acc + (subject.attendedClasses / subject.totalClasses) * 100;
    }, 0);

    return Number((totalPercentage / validSubjects.length).toFixed(2));
  };

  return {
    subjects,
    addSubject,
    updateSubject,
    deleteSubject,
    calculateOverallAttendance,
    lastAddedId,
  };
}