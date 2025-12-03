export type UserRole = 'admin' | 'staff' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  dateOfBirth: string;
  department: string;
  contact: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated';
}

export interface StudentMark {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  grade: string;
  semester: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  department: string;
  description: string;
  syllabusUrl?: string;
  instructor: string;
}

export interface FeePayment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'cash' | 'card' | 'bank_transfer' | 'online';
  description: string;
  receiptNumber: string;
}

export interface FeeStructure {
  id: string;
  name: string;
  amount: number;
  type: 'tuition' | 'exam' | 'library' | 'lab' | 'other';
  semester: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  pendingFees: number;
  activeStudents: number;
  recentEnrollments: number;
}
