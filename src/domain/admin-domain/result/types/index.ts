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

export interface BroadsheetResponse {
  success: boolean;
  data: {
    classId: number;
    academicSessionId: number;
    subjects: string[];
    usePosition: boolean;
    rows: BroadsheetRow[];
    className: string;
    classTeacher: string | null;
    sessionName: string;
  };
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

export interface StudentResultPerformance {
  totalScore: number;
  averageScore: number;
  position: number | null;
  overallGrade: string;
}

export interface StudentResultData {
  student: {
    name: string;
    registrationNumber: string;
    passportUrl: string;
    class: string;
    campus: string;
    session: string;
  };
  subjects: SubjectResult[];
  performance: StudentResultPerformance;
}

export interface GetStudentResultResponse {
  success: boolean;
  data: StudentResultData;
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

export interface TeacherResultRow {
  registrationNumber: string;
  studentName: string;
  caScores: { name: string; score: number }[];
  caTotal: number;
  examTotal: number;
  subjectTotal: number;
  grade: string;
  remark: string;
}

export interface TeacherResultData {
  teacher: {
    name: string;
    registrationNumber: string;
    campus: string | null;
  };
  subject: string;
  class: string;
  session: string;
  submission: {
    id: number;
    status: string;
    submittedAt: string;
  };
  rows: TeacherResultRow[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface GetTeacherResultResponse {
  success: boolean;
  data: TeacherResultData;
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
