export interface TenantInfo {
  id: string,
  name: string,
  isActive: number,
  createdDate: number,
  logo: string,
  backgroundLogin: string,
  favicon: string,
  domain: string,
  phone: string,
  email: string,
  address: string,
  areaCode: string,
  timeZoneCode: string,
  languageCode: string,
  monetaryUnitCode: string,
}

export interface InputUpdate {
  id: string,
  name: string,
  isActive: number,
  logo: string,
  backgroundLogin: string,
  favicon: string,
  phone: string,
  email: string,
  address: string,
  areaCode: string,
  timeZoneCode: string,
  languageCode: string,
  monetaryUnitCode: string,
}

export interface ValidateUpdateTenant {
  name: itemValidate[],
  phone: itemValidate[],
  email: itemValidate[],
  address: itemValidate[],
}

export interface itemValidate {
  type: string,
  message: string,
}

export interface UpdateConfigLogin {
  isContainsAtLeastOneNumeric: boolean,
  isContainsAtLeastOneSpecial: boolean,
  isContainsAtLeastOneUppercase: boolean,
  linkAndroid: string,
  linkIOS: string
}

export interface DetailConfigLogin {
  isContainsAtLeastOneNumeric: number,
  isContainsAtLeastOneSpecial: number,
  isContainsAtLeastOneUppercase: number,
  linkAndroid: string,
  linkIOS: string
}
