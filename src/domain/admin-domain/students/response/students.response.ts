
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
  dateOfBirth: string;
  guardianName: string;
  guardianNumber: string;
  lifestyle: string;
  academicSessionId: number;
  email: string;
  classGroupId: number | null;
  registrationNumber: string;
  passportUrl?: string | null;
  createdAt: string;
  class?: Class;
  classGroup?: ClassGroup | null;
  academicSession?: AcademicSession | null;
  campus?: Campus;
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
  academicSessionId: number;
  email: string;
  classGroupId: number | null;
  registrationNumber: string;
  passportUrl?: string | null;
  createdAt: string;
  campus: Campus;
  class?: Class;
  classGroup?: ClassGroup | null;
  academicSession?: AcademicSession | null;
}

export interface Campus {
  id: number
  name: string
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
  customName: string | null;
  staffId: number | null;
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

export interface AcademicSession {
  id: number;
  name: string;
  isActive: boolean;
}
