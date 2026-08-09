export interface PermissionDefinition {
  key: string;
  label: string;
  module: string;
}

export interface AccessRole {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  description?: string;
  permissions: string[];
  isSystem: boolean;
  isAssignable: boolean;
  userCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AssignableRole {
  id: string;
  name: string;
  slug: string;
  isSystem: boolean;
}

export interface RoleListEnvelope {
  success: boolean;
  data: AccessRole[];
  permissions: PermissionDefinition[];
}

export interface RoleInput {
  name: string;
  slug?: string;
  description?: string;
  permissions: string[];
  isAssignable?: boolean;
}
