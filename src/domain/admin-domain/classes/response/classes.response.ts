export interface CreateClassesResponse {
  success: boolean;
  message: string;
  class: Class;
}

export interface Class {
  id: number;
  schoolId: number;
  campusId: number;
  name: string;
  customName: string;
  staffId: number;
  createdAt: string;
}

