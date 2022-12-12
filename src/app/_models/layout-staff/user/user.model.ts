
export interface UserList {
  id: string,
  avatar: string,
  fullname: string,
  code: string,
  username: string,
  gender: number,
  email: string,
  phone: string,
  birthday: number,
  isActive: 0 | 1,
  isLogin: 0 | 1,
  isChangePassword: 0 | 1,
  roleNumber: number
}

export interface UserStore {
  avatar?: string,
  fullName: string,
  code: string,
  username: string,
  password: string,
  gender?: number,
  birthday?: number,
  email?: string,
  phone?: string,
  note?: string,
  isActive?: number,
  isAccessApp?: number,
  roleId?: string,
  campusId?: string,
  schoolId?: string
}

export interface UserEdit {
  userId: string,
  avatar?: string,
  fullName: string,
  gender: number,
  birthday?: number,
  email?: string,
  phone?: string,
  isActive: number,
  isAccessApp: number,
}



export interface UserInfo {
  id: string,
  avatar: string,
  fullname: string,
  code: string,
  username: string,
  gender: number,
  email: string,
  phone: string,
  birthday: number,
  isAccessApp: number,
  isActive: number
}

export interface RoleList {
  userRoleId: string,
  roleId: string,
  roleCode: string,
  roleName: string,
  unitName: string,
  layout: string
}


export interface RoleToAssignList {
  id: string,
  code: string,
  name: string,
  layout: string,
  disabled?: boolean;
}

export interface SchoolList {
  id: string,
  name: string,
  code: string,
  unitCode: string,
  unitName: string,
  isActive: number,
  disabled?: boolean;
}

export interface CampusList {
  id: string,
  name: string,
  code: string,
  disabled?: boolean;
}

export interface AssignRole {
  userId: string,
  roles: {
    roleId: string,
    campusId?: string,
    schoolId?: string,
  }
}

export interface removeRole {
  userRoleId: string,
  userId: string,
  roleId: string
}

