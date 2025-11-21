export interface CreateCampusResponse {
  success: boolean;
  message: string;
  campus: Campus;
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

//== GET CAMPUS RESPONSE ==//
export interface GetCampusResponse {
  success: boolean;
  total: number;
  page: number;
  pages: number;
  campuses: Campuse[];
}

export interface Campuse {
  id: number;
  schoolId: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  school: School;
  _count: Count;
}

export interface School {
  id: number;
  name: string;
}

export interface Count {
  Class: number;
  Staff: number;
  Student: number;
}

//== EDIT CAMPUS ==
export interface EditCampusResponse {
  success: boolean;
  message: string;
  campus: Campus;
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


//== GET ALL SCHOOLS RESPONSE ==//
export interface GetAdminSchoolsResponse {
  message: string;
  data: Data;
}

export interface Data {
  schoolId: number;
  school: School;
}

export interface School {
  id: number;
  name: string;
  email: string;
  prefix: string;
}
