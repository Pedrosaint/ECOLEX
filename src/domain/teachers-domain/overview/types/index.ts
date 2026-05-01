export interface TeacherOverviewResponse {
  success: boolean;
  data: {
    totalStudents: number;
    totalClasses: number;
    totalSubjects: number;
    assignmentsInProgress: number;
  };
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
