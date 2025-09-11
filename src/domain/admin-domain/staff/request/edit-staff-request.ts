export interface EditStaffRequest {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  duty: string;
  nextOfKin: string;
  dateEmployed?: string | null;
  payroll: number;
  campusId: number;
}