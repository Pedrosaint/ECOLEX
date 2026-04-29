export interface CreateGradingSchemeResponse {
  success: boolean;
  message: string;
  data: {
    scheme: {
      id: number;
      schoolId: number;
      name: string;
      usePosition: boolean;
      createdAt: string;
    };
    classIds: number[];
    grades: number;
  };
}

export interface AddClassesToSchemeResponse {
  success: boolean;
  message: string;
  data: unknown;
}
