// Types for student dashboard module

export interface StudentMetricsData {
  student: {
    name: string;
    registrationNumber: string;
    class: string;
    school: {
      id: number;
      name: string;
    };
  };
  stats: {
    totalSchoolFee: number;
    totalStudentsInClass: number;
    pendingDebt: number;
    activeAssignments: number;
  };
}

export interface StudentMetricsResponse {
  success: boolean;
  data: StudentMetricsData;
}
