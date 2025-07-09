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