/* eslint-disable @typescript-eslint/no-explicit-any */
export interface GetAllStaffResponse {
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
  campusId?: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  duty: string;
  nextOfKin: string;
  dateEmployed: string;
  payroll: string;
  createdAt: string;
  campus?: Campus;
  registrationNumber: string;
  assignments: any[];
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
