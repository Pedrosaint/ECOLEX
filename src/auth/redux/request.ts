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
