export interface GetStaffsResponse {
  success: boolean;
  pagination: Pagination;
  staff: Staff[];
}

export interface Pagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Staff {
  id: number;
  schoolId: number;
  campusId: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  duty: string;
  nextOfKin: string;
  dateEmployed: string;
  payroll: string;
  createdAt: string;
  registrationNumber: string;
  campus: Campus;
  assignments: Assignment[];
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

export interface Assignment {
  id: number;
  staffId: number;
  classId: number;
  subjectId: number;
  campusId: number;
  assignedAt: string;
  class: Class;
  subject: Subject;
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
}

export interface Subject {
  id: number;
  schoolId: number;
  campusId: number;
  name: string;
  code?: string;
  createdAt: string;
}
