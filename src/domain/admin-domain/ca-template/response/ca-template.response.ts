export interface CATemplateData {
  id: number;
  name: string;
  maxScore: number;
  isExam: boolean;
  classId: number | null;
}

export interface SetCATemplateResponse {
  success: boolean;
  message: string;
  data: CATemplateData[];
}

export interface ClassSpecificTemplate {
  classId: number;
  className: string;
  templates: CATemplateData[];
}

export interface GetCATemplateResponse {
  success: boolean;
  data: {
    schoolWide: CATemplateData[];
    classSpecific: ClassSpecificTemplate | null;
  };
}

