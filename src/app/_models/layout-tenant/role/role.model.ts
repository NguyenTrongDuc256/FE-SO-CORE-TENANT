export interface Role {
  id: string;
  name: string;
  code: string;
  layout?: string;
  userNumber?: number;
  users?: any;
  description?: string;
  permissionNumber?: number
}

export interface UserRole {
  id: string;
  username: string;
  fullName?: string;
  code: string;
  account: string;
  email?: string;
  phone?: string;
  isActive?: number;
  unit?: string,
  userRoleId?: string,
  unitName?: string
}

export interface RoleForm {
  id?: string;
  name: string;
  code: string;
  layoutCode: string;
  desc?: string
}
