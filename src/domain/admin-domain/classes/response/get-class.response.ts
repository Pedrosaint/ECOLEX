/* eslint-disable @typescript-eslint/no-explicit-any */


//== GET CLASSES RESPONSE ==//
export interface GetClassesResponse {
  success: boolean;
  count: number;
  classes: Class[];
}

export interface Class {
  id: number;
  schoolId: number;
  campusId?: number;
  name: string;
  customName: string;
  staffId: number;
  createdAt: string;
  campus?: Campus;
  staff: any;
  students: any[];
  classGroups: any[];
}

export interface Campus {
  id: number;
  schoolId: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
}
