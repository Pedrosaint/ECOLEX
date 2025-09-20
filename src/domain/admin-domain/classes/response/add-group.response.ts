export interface AddGroupResponse {
  success: boolean;
  message: string;
  group: Group;
}

export interface Group {
  id: number;
  classId: number;
  name: string;
  createdAt: string;
}
