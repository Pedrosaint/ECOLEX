export interface EditGroupResponse {
  success: boolean;
  message: string;
  group: Group;
}

export interface Group {
  id: number;
  classId: number;
  name: string;
  createdAt: string;
  class: Class;
}

export interface Class {
  id: number;
  name: string;
}
