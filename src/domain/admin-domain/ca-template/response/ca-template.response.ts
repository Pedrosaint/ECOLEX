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

