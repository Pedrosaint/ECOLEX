export interface CreateSubjectResponse {
  success: boolean;
  message: string;
  subject: Subject;
}

export interface Subject {
  id: number;
  schoolId: number;
  campusId: number;
  name: string;
  code: string;
  createdAt: string;
  campus: Campus;
}

export interface Campus {
  id: number;
  name: string;
}


// Get Classes
export interface GetSubjectResponse {
  success: boolean;
  count: number;
  subjects: Subject[];
}

