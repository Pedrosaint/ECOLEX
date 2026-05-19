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
  classGroupId?: number;
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

export interface StudentCA {
  id: number;
  name: string;
  maxScore: number;
  score: number | null;
}

export interface StudentExam {
  id: number;
  name: string;
  maxScore: number;
  score: number | null;
}

export interface StudentSubjectResult {
  id: number;
  name: string;
  code: string;
  cas: StudentCA[];
  exam: StudentExam;
  caTotal: number;
  examTotal: number;
  subjectTotal: number;
  grade: string;
  remark: string;
}

export interface StudentInformation {
  id: number;
  name: string;
  surname: string;
  otherNames: string;
  registrationNumber: string;
  className: string;
  classId: number;
  campus: string;
  dateOfBirth: string;
  gender: string;
  passportUrl: string | null;
}

export interface StudentAcademicInfo {
  academicSessionId: number;
  academicSessionName: string;
  termId: number;
  termName: string;
}

export interface StudentPerformanceSummary {
  totalScore: number;
  averageScore: number;
  classPosition: string;
  overallGrade: string;
  sessionLength: number;
}

export interface StudentResultData {
  studentInformation: StudentInformation;
  academicInfo: StudentAcademicInfo;
  subjects: StudentSubjectResult[];
  performanceSummary: StudentPerformanceSummary;
  teacherRemark: string;
  schoolRecommendationDate: string;
}

export interface GetStudentResultResponse {
  success: boolean;
  data: StudentResultData;
}

export interface GetStudentResultParams {
  studentId: number;
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

export interface TeacherCAScore {
  name: string;
  score: number | null;
}

export interface TeacherStudentResult {
  registrationNumber: string;
  studentName: string;
  cas: TeacherCAScore[];
  caScore: number;
  examScore: number | null;
  total: number;
  grade: string;
  remarks: string;
}

export interface TeacherInformation {
  name: string;
  registrationNumber: string;
  gender: string | null;
  subject: string;
  subjectCode: string;
  class: string;
  campus: string;
  session: string;
  academicYear: string;
  term: string;
  dateSubmitted: string | null;
}

export interface GetTeacherResultResponse {
  success: boolean;
  data: {
    teacherInformation: TeacherInformation;
    students: TeacherStudentResult[];
    pagination: {
      page: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
    };
  };
}

export interface GetTeacherResultParams {
  staffId: number;
  classId: number;
  subjectId: number;
  academicSessionId: number;
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

export interface RemarkRule {
  minScore: number;
  maxScore: number;
  remark: string;
}

export interface CreateRemarkSchemeRequest {
  name: string;
  rules: RemarkRule[];
}

export interface RemarkSchemeRule {
  id: number;
  schemeId: number;
  minScore: number;
  maxScore: number;
  remark: string;
}

export interface RemarkScheme {
  id: number;
  schoolId: number;
  name: string;
  createdAt: string;
  rules: RemarkSchemeRule[];
}

export interface CreateRemarkSchemeResponse {
  success: boolean;
  message: string;
  data: RemarkScheme;
}

export interface GetRemarkSchemesResponse {
  success: boolean;
  data: RemarkScheme;
}

export interface GradingSchemeGrade {
  id: number;
  minScore: number;
  maxScore: number;
  grade: string;
  remark: string;
}

export interface GradingScheme {
  id: number;
  schoolId: number;
  name: string;
  usePosition: boolean;
  createdAt: string;
  campusId: number | null;
  grades: GradingSchemeGrade[];
  classes: { classId: number }[];
}

export interface GetGradingResponse {
  success: boolean;
  message: string;
  data: GradingScheme[];
}

export interface GradeRow {
  min: string;
  max: string;
  grade: string;
  remark: string;
}

export interface UpdateGradingRequest {
  name: string;
  usePosition: boolean;
  classIds: number[];
  campusId?: number | null;
  grades: GradeItem[];
}

export interface UpdateGradingResponse {
  success: boolean;
  message: string;
  data: {
    scheme: {
      id: number;
      schoolId: number;
      name: string;
      usePosition: boolean;
      campusId: number | null;
      createdAt: string;
    };
    gradesUpdated: boolean;
    grades: number;
  };
}

export interface ClassSearchParams {
  classId: number;
  classGroupId?: number;
  campusId: number;
  sessionId: number;
  termId: number;
}

export interface StudentSearchParams {
  studentId: number;
  academicSessionId: number;
  termId: number;
}

export interface TeacherSearchParams {
  staffId: number;
  classId: number;
  subjectId: number;
  academicSessionId: number;
}
