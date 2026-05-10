export interface GradeItem {
  min: number;
  max: number;
  grade: string;
  remark: string;
}

export interface CreateGradingRequest {
  name: string;
  usePosition: boolean;
  classIds: number[];
  campusId: number;
  grades: GradeItem[];
}

export interface CreateGradingResponse {
  success: boolean;
  message: string;
  data: {
    scheme: {
      id: number;
      schoolId: number;
      name: string;
      usePosition: boolean;
      createdAt: string;
      campusId: number;
    };
    classIds: number[];
    grades: number;
  };
}

export interface AcademicSession {
  id: number;
  name: string;
  isActive: boolean;
}

export interface GetAcademicSessionsResponse {
  success: boolean;
  sessions: AcademicSession[];
}

export interface SubjectScore {
  caTotal: number;
  examTotal: number;
  subjectTotal: number;
  grade: string;
  remark: string;
}

export interface BroadsheetRow {
  studentId: number;
  studentName: string;
  registrationNumber: string;
  scores: Record<string, SubjectScore>;
  grandTotal: number;
  position: number | null;
}

export interface BroadsheetParams {
  classId: number;
  classGroupId: number;
  campusId: number;
  sessionId: number;
  termId: number;
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

export interface CaScore {
  name: string;
  score: number;
}

export interface SubjectResult {
  subjectName: string;
  cas: CaScore[];
  caTotal: number;
  examTotal: number;
  subjectTotal: number;
  grade: string;
  remark: string;
}

export interface PaginatedStudentResultData {
  studentId: number;
  studentName: string;
  registrationNumber: string;
  subjects: {
    subjectName: string;
    caTotal: number | null;
    examTotal: number | null;
    subjectTotal?: number | null;
    grade?: string | null;
    remark?: string | null;
  }[];
  grandTotal: number;
}

export interface GetStudentResultResponse {
  success: boolean;
  data: {
    pagination: {
      page: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
    };
    data: PaginatedStudentResultData[];
  };
}

export interface GetStudentResultParams {
  studentId: number;
  classId: number;
  academicSessionId: number;
  termId: number;
}

export interface PublishResultsRequest {
  classId: number;
  subjectId: number;
  academicSessionId: number;
  termId: number;
}

export interface PublishResultsResponse {
  success: boolean;
  message: string;
  data: {
    publicationId: number;
    classId: number;
    subjectId: number;
    academicSessionId: number;
    publishedAt: string;
    totalStudents: number;
  };
}

export interface TeacherResultAssignment {
  classId: number;
  className: string;
  subjectId: number;
  subjectName: string;
}

export interface TeacherResultStaff {
  staffId: number;
  staffName: string;
  registrationNumber: string;
  assignments: TeacherResultAssignment[];
}

export interface GetTeacherResultResponse {
  success: boolean;
  data: {
    pagination: {
      page: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
    };
    data: TeacherResultStaff[];
  };
}

export interface GetTeacherResultParams {
  staffId: number;
  classId: number;
  subjectId: number;
  academicSessionId: number;
  termId: number;
  campusId: number;
  page?: number;
}

export interface PendingSubmission {
  id: number;
  status: string;
  submittedAt: string;
  class: { id: number; name: string; campus: { id: number; name: string } };
  subject: { id: number; name: string };
  academicSession: { id: number; name: string };
  term: { id: number; name: string };
  staff: { id: number; name: string };
}

export interface PendingSubmissionsResponse {
  success: boolean;
  data: PendingSubmission[];
}

export interface PendingSubmissionsParams {
  campusId?: number;
  classId?: number;
  termId?: number;
  subjectId?: number;
}

export interface RejectResultsRequest {
  classId: number;
  subjectId: number;
  academicSessionId: number;
}

export interface RejectResultsResponse {
  success: boolean;
  message: string;
}

export interface GradeRow {
  min: string;
  max: string;
  grade: string;
  remark: string;
}

export interface ClassSearchParams {
  classId: number;
  classGroupId: number;
  campusId: number;
  sessionId: number;
  termId: number;
}

export interface StudentSearchParams {
  studentId: number;
  classId: number;
  academicSessionId: number;
  termId: number;
}

export interface TeacherSearchParams {
  staffId: number;
  classId: number;
  subjectId: number;
  academicSessionId: number;
  termId: number;
  campusId: number;
}
