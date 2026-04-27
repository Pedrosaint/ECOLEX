import type { ClassGroup } from "./students.response"

export interface GetStudentsResponse {
  students: Student[]
  meta: Meta
}

export interface Student {
  id: number
  schoolId: number
  campusId: number
  classId: number
  name: string
  surname: string
  otherNames: string
  gender: string
  dateOfBirth: string
  guardianName: string
  guardianNumber: string
  lifestyle: string
  academicSessionId: number
  email: string
  classGroupId: number | null;
  registrationNumber: string
  createdAt: string
  class?: Class
  campus?: Campus
}

export interface Class {
  id: number
  schoolId: number
  campusId: number
  name: string
  customName: string
  staffId: number
  createdAt: string
  classGroups: ClassGroup[]
}

export interface Campus {
  id: number
  name: string
}

export interface Meta {
  total: number
  page: number
  pageSize: number
  totalPages: number
}
