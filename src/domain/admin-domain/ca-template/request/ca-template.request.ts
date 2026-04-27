export interface CATemplateItem {
  name: string;
  maxScore: number;
  isExam: boolean;
}

export interface SetDefaultCATemplateRequest {
  templates: CATemplateItem[];
}

export interface SetClassCATemplateRequest {
  classId: number;
  templates: CATemplateItem[];
}
