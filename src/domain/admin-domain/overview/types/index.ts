export interface TermData {
  id: number;
  name: string;
  isActive: boolean;
  createdAt?: string;
}

export interface SessionData {
  id: number;
  name: string;
  isActive: boolean;
  terms: TermData[];
}

export interface UpcomingExam {
  id: number;
  name: string;
  createdAt: string;
  class: { name: string; customName: string | null };
  subject: { name: string };
}

export interface OverviewData {
  students: { total: number; boys: number; girls: number };
  staff: { total: number };
  campuses: { total: number };
  bill: string | null;
  upcomingExams: UpcomingExam[];
  activeSession: { id: number; name: string } | null;
  activeTerm: { id: number; name: string } | null;
  noticeBoard: null;
}

export interface GetOverviewResponse {
  success: boolean;
  data: OverviewData;
}

export interface GetSessionsResponse {
  success: boolean;
  data: SessionData[];
}

export interface CreateSessionResponse {
  success: boolean;
  message: string;
  data: { id: number; name: string; isActive: boolean };
}

export interface CreateTermResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    isActive: boolean;
    session: { id: number; name: string };
  };
}

export interface ActivateTermResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    isActive: boolean;
    session: { id: number; name: string; isActive: boolean };
  };
}
