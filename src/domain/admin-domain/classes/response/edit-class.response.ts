/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EditClassResponse {
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
  staffId: any;
  createdAt: string;
}
