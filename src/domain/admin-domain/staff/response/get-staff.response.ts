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
  payroll: string;
  createdAt: string;
  registrationNumber: string;
  campus: Campus;
}

export interface Campus {
  id: number;
  name: string;
}