export interface CreateSubjectResponse {
  success: boolean;
  message: string;
  subject: Subject;
}

export interface Subject {
  id: number;
  schoolId: number;
  campusId?: number;
  name: string;
  code?: string;
  createdAt: string;
  campus?: Campus;
}

export interface Campus {
  id: number;
  name: string;
}


export interface GetSubjectResponse {
  success: boolean;
  count: number;
  subjects: Subject[];
}

export interface AssignSubjectToClassResponse {
  success: boolean;
  message: string;
  data: {
    assigned: number;
    skipped: number;
    casCreated: number;
    examsCreated: number;
  };
}

export interface ClassSubject {
  id: number;
  name: string;
  code: string;
}

export interface GetClassSubjectsResponse {
  success: boolean;
  data: {
    classId: number;
    className: string;
    subjects: ClassSubject[];
  };
}

