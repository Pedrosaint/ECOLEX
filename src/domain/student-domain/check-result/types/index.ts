export interface StudentSession {
  id: number;
  name: string;
  isActive: boolean;
}

export interface GetStudentSessionsResponse {
  success: boolean;
  data: StudentSession[];
}

export interface SubjectResult {
  sn: number;
  subject: string;
  cas: number[];
  exam: number;
  total: number;
  grade: string;
  classAvg: number;
  position: number;
}

export interface GetStudentResultsResponse {
  success: boolean;
  data: SubjectResult[];
}

export interface GetStudentResultsParams {
  academicSessionId: number;
}
