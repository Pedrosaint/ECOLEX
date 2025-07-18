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
  schoolId: any;
  campusId: any;
  name: string;
  email: string;
  password: string;
  steps: number;
  role: string;
  createdAt: string;
}
  

export interface SchoolSetupResponse {
  message: string;
  school: School;
}

export interface School {
  id: number;
  name: string;
  prefix: string;
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
  schoolId: any;
  campusId: any;
  name: string;
  email: string;
  password: string;
  steps: number;
  role: string;
  createdAt: string;
}
  
export interface CampusSetupResponse {
  message: string;
  campus: number;
  date: Date;
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

export interface ClassSetupResponse {
  message: string;
  count: number;
  data: Data;
}

export interface Data {
  savedClasses: SavedClass[];
}

export interface SavedClass {
  id: number;
  schoolId: number;
  campusId: number;
  name: string;
  teacherId: any;
  createdAt: string;
}

export interface CCAResponse {
  message: string;
}