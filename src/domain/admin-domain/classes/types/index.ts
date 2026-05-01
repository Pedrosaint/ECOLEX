// Request types (all unique)
export * from '../request/add-group.request';
export * from '../request/classes.request';
export * from '../request/edit-class.request';
export * from '../request/edit-group.request';

// Response top-level types (unique per file)
export type { AddGroupResponse } from '../response/add-group.response';
export type { CreateClassesResponse } from '../response/classes.response';
export type { EditClassResponse } from '../response/edit-class.response';
export type { EditGroupResponse } from '../response/edit-group.response';
export type { GetClassesResponse } from '../response/get-class.response';
export type { GetClassGroupsResponse, Pagination } from '../response/get-group.response';
export type { CCAResponse, Assessment } from '../response/cca_response';

// Canonical supporting types
export type { Class, Campus } from '../response/get-class.response';
export type { Group } from '../response/get-group.response';
