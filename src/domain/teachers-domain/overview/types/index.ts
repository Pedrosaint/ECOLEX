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

export interface StudentScoreEntry {
  studentId: number;
  ca1?: number;
  ca2?: number;
  ca3?: number;
}

export interface SubmitCaScoresRequest {
  termId: number;
  classId: number;
  subjectId: number;
  scores: StudentScoreEntry[];
}

export interface StudentExamEntry {
  studentId: number;
  exam?: number;
}

export interface SubmitExamScoresRequest {
  termId: number;
  classId: number;
  subjectId: number;
  scores: StudentExamEntry[];
}

export interface SubmitResultsRequest {
  termId: number;
  classId: number;
  subjectId: number;
}

export interface ScoreSubmitResponse {
  success: boolean;
  message: string;
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
}

export interface BroadsheetRow {
  studentId: number;
  studentName: string;
  registrationNumber: string;
  scores: Record<string, BroadsheetSubjectScore>;
  grandTotal: number;
  position: string | null;
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
  data: TeacherBroadsheetData;
}
