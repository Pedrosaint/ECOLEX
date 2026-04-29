export interface GradeItem {
  min: number;
  max: number;
  grade: string;
  remark: string;
}

export interface CreateGradingSchemeRequest {
  name: string;
  usePosition: boolean;
  classIds: number[];
  grades: GradeItem[];
}

export interface AddClassesToSchemeRequest {
  classIds: number[];
}
