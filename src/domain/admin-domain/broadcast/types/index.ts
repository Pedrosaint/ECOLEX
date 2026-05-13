export interface ResultStatusItem {
  id: number;
  publishedAt: string;
  class: { id: number; name: string; campus: { id: number; name: string } };
  subject: { id: number; name: string };
  academicSession: { id: number; name: string };
  term: { id: number; name: string } | null;
  admin: { id: number; name: string };
}

export interface GetResultsByStatusResponse {
  success: boolean;
  status: string;
  data: ResultStatusItem[];
}

export interface UnpublishResultResponse {
  success: boolean;
  message: string;
}

export interface BroadsheetSubjectScore {
  caTotal: number;
  examTotal: number;
  subjectTotal: number;
  grade: string;
}

export interface BroadsheetRow {
  studentId: number;
  studentName: string;
  registrationNumber: string;
  scores: Record<string, BroadsheetSubjectScore>;
  grandTotal: number;
  position: number | null;
}

export interface BroadsheetData {
  classId: number;
  academicSessionId: number;
  subjects: string[];
  usePosition: boolean;
  rows: BroadsheetRow[];
  className: string;
  classTeacher: string | null;
  sessionName: string;
}

export interface BroadsheetResponse {
  success: boolean;
  data: BroadsheetData[];
}

export interface BroadsheetQueryParams {
  classId: number;
  academicSessionId: number;
  termId: number;
}
