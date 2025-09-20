/* eslint-disable @typescript-eslint/no-explicit-any */

//Create Student
export interface CreateStudentResponse {
  success: boolean;
  message: string;
  student: Student;
}

export interface Student {
  id: number;
  schoolId: number;
  campusId: number;
  classId: number;
  name: string;
  surname: string;
  otherNames: string;
  gender: string;
  dateOfBirth: any;
  guardianName: string;
  guardianNumber: string;
  lifestyle: string;
  session: string;
  email: string;
  createdAt: string;
}



// Get Students
export interface GetStudentsResponse {
  students: Student[];
  meta: Meta;
}

export interface Student {
  id: number;
  schoolId: number;
  campusId: number;
  classId: number;
  name: string;
  surname: string;
  otherNames: string;
  gender: string;
  dateOfBirth: any;
  guardianName: string;
  guardianNumber: string;
  lifestyle: string;
  session: string;
  email: string;
  createdAt: string;
  class: Class;
  campus: Campus;
}

export interface Class {
  id: number;
  schoolId: number;
  campusId: number;
  name: string;
  staffId: any;
  createdAt: string;
  classGroups: any[];
}

export interface Campus {
  id: number;
  schoolId: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
}

export interface Meta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}



// Edit Student
export interface EditStudentResponse {
  success: boolean;
  message: string;
  student: Student;
}