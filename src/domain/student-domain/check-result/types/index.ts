export interface StudentSubjectResult {
  subject: string;
  ca1: number;
  ca2: number;
  ca3: number;
  caTotal: number;
  exam: number;
  total: number;
  grade: string;
  remark: string;
  position?: number | null;
}

export interface StudentResultData {
  studentName: string;
  registrationNumber: string;
  className: string;
  sessionName: string;
  termName: string;
  results: StudentSubjectResult[];
  grandTotal: number;
  overallPosition?: number | null;
}

export interface GetStudentResultsResponse {
  success: boolean;
  data: StudentResultData;
}

export interface GetStudentResultsParams {
  termId: number;
}
