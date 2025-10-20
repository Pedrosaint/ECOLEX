export interface AssignTeacherResponse {
  success: boolean;
  message: string;
  assignment: Assignment;
}

export interface Assignment {
  id: number;
  staffId: number;
  classId: number;
  subjectId: number;
  campusId: number;
  assignedAt: string;
}
