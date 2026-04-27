export interface CreateSubjectRequest {
  campusId?: number;
  name: string;
  code?: string;
}

export interface AssignSubjectToClassRequest {
  classId: number;
  subjectIds: number[];
}
