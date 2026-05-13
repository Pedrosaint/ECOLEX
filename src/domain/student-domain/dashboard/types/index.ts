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
  currentTerm: {
    id: number;
    name: string;
    resumptionDate: string;
  } | null;
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
