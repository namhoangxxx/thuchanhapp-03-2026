import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Student,
  Subject,
  ScheduleItem,
  Assignment,
  AcademicResult,
  INITIAL_STUDENT,
  INITIAL_SUBJECTS,
  INITIAL_SCHEDULE,
  INITIAL_ASSIGNMENTS,
  INITIAL_ACADEMIC_RESULTS,
} from '../data/mockData';

interface AppContextType {
  student: Student;
  updateStudent: (name: string, email: string, phone: string) => void;
  subjects: Subject[];
  schedule: ScheduleItem[];
  assignments: Assignment[];
  toggleAssignment: (id: string) => void;
  academicResults: AcademicResult[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<Student>(INITIAL_STUDENT);
  const [subjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [schedule] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [academicResults] = useState<AcademicResult[]>(INITIAL_ACADEMIC_RESULTS);

  // Cập nhật thông tin sinh viên (Họ tên, email, sđt)
  const updateStudent = (name: string, email: string, phone: string) => {
    setStudent(prev => ({
      ...prev,
      name,
      email,
      phone,
    }));
  };

  // Cập nhật trạng thái bài tập (Hoàn thành / Chưa hoàn thành)
  const toggleAssignment = (id: string) => {
    setAssignments(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        student,
        updateStudent,
        subjects,
        schedule,
        assignments,
        toggleAssignment,
        academicResults,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

