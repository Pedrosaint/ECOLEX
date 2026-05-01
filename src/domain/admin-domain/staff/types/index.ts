// Request types
export * from '../request/assign-teacher.request';
export * from '../request/create-staff.request';
export * from '../request/edit-staff-request';

// Response top-level types (unique per file)
export type { AssignTeacherResponse } from '../response/assign-teacher.response';
export type { CreateStaffResponse } from '../response/create-staff.response';
export type { DeleteStaffResponse } from '../response/delete-staff.response';
export type { EditStaffResponse } from '../response/edit-staff.response';
export type { GetAllStaffResponse } from '../response/get-all-staff.response';
export type { GetStaffResponse } from '../response/get-staff.response';
export type { GetStaffsResponse } from '../response/get-staffs.response';

// Shared/canonical supporting types from the richest source
export type {
  Staff,
  Campus,
  Assignment,
  Class,
  Subject,
  Pagination,
} from '../response/get-all-staff.response';
