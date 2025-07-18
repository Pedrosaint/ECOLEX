// Request types
export interface TokenRequest {
  email: string;
  schoolName: string;
}

export interface AdminRequest {
  email: string;
  name: string;
  password: string;
  role: string;
  uniqueKey: string;
}

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface CampusSetupRequest {
  school_id: number;
  campuses: Campuse[];
}

export interface Campuse {
  email: string;
  name: string;
  address: string;
  phoneNumber: string;
}

// export interface Campuse {
//   email: string;
//   name: string;
//   address: string;
//   phoneNumber: string;
// }

export interface ClassSetupRequest {
  school_id: number;
  classes: Class[];
}

export interface Class {
  name: string;
}

export interface CCARequest {
  assessments: Assessment[];
  exam: Exam;
}

export interface Assessment {
  class_id: number;
  name: string;
  weightage: number;
  max_score: number;
}

export interface Exam {
  class_id: number;
  name: string;
  weightage: number;
  max_score: number;
}

