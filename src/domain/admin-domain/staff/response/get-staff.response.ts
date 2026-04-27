export interface GetStaffResponse {
  success: boolean;
  staff: Staff;
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
  payroll: number;
  createdAt: string;
  registrationNumber: string;
  campus: Campus;
  assignments: Assignment[];
}

export interface Campus {
  id: number;
  schoolId?: number;
  name: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  createdAt?: string;
}

export interface Assignment {
  id: number;
  staffId: number;
  classId: number;
  subjectId: number;
  campusId: number | null;
  assignedAt: string;
  class: {
    id: number;
    name: string;
  };
  subject: {
    id: number;
    name: string;
    code: string;
  };
}