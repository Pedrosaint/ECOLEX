export interface CreateStudentRequest {
  campusId: number;
  classId: number;
  surname: string;
  name: string;
  otherNames: string;
  gender: string;
  dateOfBirth: string;
  guardianName: string;
  guardianNumber: string;
  lifestyle: string;
  session: string;
  email: string;
}


// Edit Student
export interface EditStudentRequest {
    campusId: number;
    classGroupId: number;
    classId: number;
    name: string;
    surname: string;
    otherNames: string;
    gender: string;
    dateOfBirth?: string | null;
    guardianName: string;
    guardianNumber: string;
    lifestyle: string;
    session: string;
    email: string;
  };

  // Change Student Class
export interface ChangeStudentClassRequest {
  studentIds: number[];
  classId: number;
  groupId: number;
  campusId: number;
}
