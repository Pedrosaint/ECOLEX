export interface CCAResponse {
  success: boolean
  total: number
  page: number
  pageSize: number
  count: number
  assessments: Assessment[]
}

export interface Assessment {
  id: number
  classId: number
  subjectId: any
  name: string
  maxScore: number
  createdAt: string
  class: Class
  subject: any
}

export interface Class {
  id: number
  name: string
  campusId: number
  campus: Campus
}

export interface Campus {
  id: number
  name: string
}
