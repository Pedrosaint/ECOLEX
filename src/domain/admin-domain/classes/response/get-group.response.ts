export interface GetClassGroupsResponse {
  success: boolean;
  message: string;
  pagination: Pagination;
  groups: Group[];
}

export interface Pagination {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
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
