/* eslint-disable @typescript-eslint/no-explicit-any */
// Response types

export interface TokenResponse {
  token: string;
  message: string;
}

export interface AdminResponse {
  message: string;
  data: Data;
}

export interface Data {
  token: string;
  admin: Admin;
}

export interface Admin {
  id: number;
  schoolId: number;
  campusId: number;
  name: string;
  email: string;
  password: string;
  steps: number;
  role: string;
  createdAt: string;
  hasLoggedIn: boolean;
}


export interface SchoolSetupResponse {
  message: string;
  school: School;
}

export interface School {
  id: number;
  name: string;
  prefix?: string;
  logoUrl: string;
  stampUrl: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
}


export interface AdminLoginResponse {
  message: string;
  data: AdminLogin;
}

export interface AdminLogin {
  token: string;
  admin: Admin;
}

export interface Admin {
  id: number;
  schoolId: number;
  campusId: number;
  name: string;
  email: string;
  password: string;
  steps: number;
  role: string;
  createdAt: string;
  hasLoggedIn: boolean;
}

export interface CampusSetupResponse {
  message: string;
  count: number;
  date: Date;
  step: Step;
}

export interface Date {
  savedCampuses: SavedCampus[];
}

export interface SavedCampus {
  id: number;
  schoolId: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
}

export interface Step {
  previous: number;
  current: number;
  incremented: boolean;
  capped: boolean;
}

export interface ClassSetupResponse {
  message: string;
  count: number;
  data: Data;
  step: Step;
}

export interface Data {
  savedClasses: SavedClass[];
}

export interface SavedClass {
  id: number;
  schoolId: number;
  campusId: number;
  name: string;
  customName: string | any;
  teacherId: any | string;
  createdAt: string;
}

export interface CCAResponse {
  message: string;
  step: Step;
}

export interface TeacherLoginResponse {
  success: boolean;
  message: string;
  data: TeacherLoginData;
}

export interface TeacherLoginData {
  token: string;
  teacher: Teacher;
}

export interface Teacher {
  id: number;
  name: string;
  registrationNumber: string;
  school: { id: number; name: string };
  campus: { id: number; name: string } | null;
}

export interface StudentLoginResponse {
  success: boolean;
  message: string;
  data: StudentLoginData;
}

export interface StudentLoginData {
  token: string;
  student: Student;
}

export interface Student {
  id: number;
  name: string;
  registrationNumber: string;
  school: { id: number; name: string };
  campus: { id: number; name: string };
  class: { id: number; name: string };
}