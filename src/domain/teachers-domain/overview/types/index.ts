export interface TeacherOverviewResponse {
  success: boolean;
  data: {
    totalStudents: number;
    totalClasses: number;
    totalSubjects: number;
    assignmentsInProgress: number;
  };
}

export interface ActiveTermResponse {
  success: boolean;
  data: {
    activeSession: {
      id: number;
      name: string;
    };
    activeTerm: {
      id: number;
      name: string;
    };
  };
}

export interface TeacherClass {
  id: number;
  name: string;
  customName: string | null;
  class?: {
    id: number;
    name: string;
  };
}

export interface TeacherClassesResponse {
  success: boolean;
  data: TeacherClass[];
}

export interface TeacherCampus {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
}

export interface TeacherCampusResponse {
  success: boolean;
  data: TeacherCampus;
}

export interface TeacherClassGroup {
  id: number;
  name: string;
  classId: number;
  class: {
    name: string;
    customName: string | null;
  };
  className: string;
}

export interface TeacherClassGroupsResponse {
  success: boolean;
  data: TeacherClassGroup[];
}

export interface TeacherSession {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
}

export interface TeacherSessionResponse {
  success: boolean;
  data: TeacherSession;
}

export interface SubmitCaEntry {
  studentId: number;
  caId: number;
  score: number;
}

export interface SubmitCaScoresRequest {
  academicSessionId: number;
  termId: number;
  entries: SubmitCaEntry[];
}

export interface SubmitExamEntry {
  studentId: number;
  examId: number;
  score: number;
}

export interface SubmitExamScoresRequest {
  academicSessionId: number;
  termId: number;
  entries: SubmitExamEntry[];
}

export interface SubmitResultsRequest {
  classId: number;
  subjectId: number;
  academicSessionId: number;
  termId: number;
}

export interface SubmitResultsData {
  id: number;
  classId: number;
  subjectId: number;
  academicSessionId: number;
  status: string;
  submittedAt: string;
}

export interface SubmitResultsResponse {
  success: boolean;
  message: string;
  data: SubmitResultsData;
}

export interface TeacherSubject {
  id: number;
  name: string;
}

export interface TeacherSubjectsResponse {
  success: boolean;
  data: TeacherSubject[];
}

export interface ScoreSubmitResponse {
  success: boolean;
  message: string;
  updated?: number;
}


export interface TeacherBroadsheetParams {
  classId: number;
  academicSessionId: number;
  termId: number;
}

export interface BroadsheetSubjectScore {
  caTotal: number;
  examTotal: number;
  subjectTotal: number;
  grade: string;
  remark?: string;
}

export interface BroadsheetRow {
  studentId: number;
  studentName: string;
  registrationNumber: string;
  scores: Record<string, BroadsheetSubjectScore>;
  grandTotal: number;
  position: string | number | null;
}

export interface TeacherBroadsheetData {
  classId: number;
  academicSessionId: number;
  subjects: string[];
  usePosition: boolean;
  rows: BroadsheetRow[];
}

export interface TeacherBroadsheetResponse {
  success: boolean;
  data: TeacherBroadsheetData[];
}

export interface CaTemplate {
  id: number;
  studentId?: number;
  registrationNumber?: string;
  studentName?: string;
  classId: number;
  subjectId: number;
  name: string;
  maxScore: number;
  createdAt: string;
  createdByAdminId: number;
  class: { id: number; name: string };
  subject: { id: number; name: string };
}

// New combined response for CA and Exam tabs
export interface StudentsWithScoresData {
  academicSessionId: number;
  termId: number | null;
  classIds: number[];
  cas: { id: number; name: string; maxScore: number; subject?: { id: number; name: string } }[];
  exams: { id: number; name: string; maxScore: number; subject?: { id: number; name: string } }[];
  students: {
    id: number;
    registrationNumber: string;
    surname: string;
    name: string;
    otherNames: string;
    className: string;
    caScores: {
      caId: number;
      caName: string;
      score: number | null;
      maxScore: number;
    }[];
    examScore: {
      examId: number;
      examName: string;
      score: number | null;
      maxScore: number;
    } | null;
    caTotal: number;
    examTotal: number;
    grandTotal: number;
  }[];
}

export interface TeacherStudentsWithScoresResponse {
  success: boolean;
  data: StudentsWithScoresData;
}

export interface TeacherStudentsWithScoresParams {
  classId: number;
  classGroupId: number;
}

// Keeping old names for hooks but changing to the new response type
export type TeacherCaTemplatesResponse = TeacherStudentsWithScoresResponse;
export type TeacherExamTemplatesResponse = TeacherStudentsWithScoresResponse;

export interface TeacherCaTemplatesParams {
  classId: number;
  classGroupId: number;
  subjectId?: number;
}

export interface TeacherExamTemplatesParams {
  classId: number;
  classGroupId: number;
  subjectId?: number;
}

export interface TeacherSubjectsByGroupResponse {
  success: boolean;
  total: number;
  subjects: {
    id: number;
    name: string;
    code: string;
    class: {
      id: number;
      name: string;
    };
  }[];
}

export interface TeacherProfile {
  id: number;
  name: string;
  registrationNumber: string;
  email: string;
  phoneNumber: string;
  address: string;
  duty: string;
  dateEmployed: string;
  schoolId: number;
}

export interface TeacherProfileResponse {
  success: boolean;
  data: TeacherProfile;
}
