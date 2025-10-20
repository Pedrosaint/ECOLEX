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
 pagination: Pagination;
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
  classGroupId: number;
  registrationNumber: string;
  createdAt: string;
  class: Class;
  campus: Campus;
}

export interface Class {
  id: number;
  schoolId: number;
  campusId: number;
  name: string;
  customName: string;
  staffId: number;
  createdAt: string;
  classGroups: ClassGroup[];
}

export interface ClassGroup {
  id: number;
  classId: number;
  name: string;
  createdAt: string;
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

export interface Pagination {
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

// Get Student
export interface GetStudentResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  schoolId: number;
  campusId: number;
  classId: number;
  name: string;
  surname: string;
  otherNames: string;
  gender: string;
  dateOfBirth: string;
  guardianName: string;
  guardianNumber: string;
  lifestyle: string;
  session: string;
  email: string;
  classGroupId: number;
  registrationNumber: string;
  createdAt: string;
}

// Change Student Class
export interface ChangeStudentClassResponse {
  success: boolean;
  message: string;
  students: Student[];
}

export interface Class {
  id: number;
  schoolId: number;
  campusId: number;
  name: string;
  customName: string;
  staffId: number;
  createdAt: string;
  classGroups: ClassGroup[];
  campus: Campus;
}

export interface ClassGroup {
  id: number;
  classId: number;
  name: string;
  createdAt: string;
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

