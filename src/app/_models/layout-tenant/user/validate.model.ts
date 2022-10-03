interface item {
  type: string,
  message: string,
}

export interface ValidateUser {
  avatar?: item[],
  fullName?: item[],
  code?: item[],
  username?: item[],
  password?: item[],
  gender?: item[],
  birthday?: item[],
  email?: item[],
  phone?: item[],
  note?: item[],
  isActive?: item[],
  isAccessApp?: item[],
  roleId?: item[],
  campusId?: item[],
  schoolId?: item[],
}

