export interface NotificationList {
  id: string,
  title: string,
  avatar: string,
  description: string,
  content: string,
  files: [],
  sendingScope: number,
  recipientGroups: number[],
  objectIds: [],
  isAllowComment: number,
  type: number,
  status: number,
  sendAt: number,
  isLastUpdateByWeb: number,
  recipientNumber: number,
  receivedUserNumber: number,
  readUserNumber: number,
  createdByUserId: number,
  createdBy: number,
  commentNumber: number,
  likeNumber: number,
  sendingScopeName: string
  recipientGroupsLabel: any[]
  statusLabel: string
  objects: Objects[]
}

export interface Objects {
  id: number,
  name: string,
  code: string,
}

export interface SendingScopeList {
  value: number,
  label: string,
}

export interface RecipientGroupList {
  value: number,
  label: string,
  checked ?: boolean
}

export interface CreatedByList {
  id: string,
  fullName: string,
}

export interface SendList {
  id: string,
  name: string,
}

export interface NotificationStore {
  title: string,
  avatar: number,
  description: string,
  content: string,
  files: [],
  sendingScope: number,
  recipientGroups: number[],
  objectIds: [],
  isAllowComment: number,
  sendAt: number,
  type: number,
}

export interface NotificationEdit {
  id: string,
  title: string,
  avatar: number,
  description: string,
  content: string,
  files: [],
  sendingScope: number,
  recipientGroups: number[],
  objectIds: [],
  isAllowComment: number,
  sendAt: number,
  type: number,
}

export interface ObjectReceivedInfo {
  id: string,
  fullName: string,
  code: string,
  username: string,
  status: number,
  sentAt: number,
  statusName: string,
  avatar: string,
  canDelete: number,
}

export interface NotificationInfo {
  id: string,
  title: string,
  avatar: string,
  description: string,
  content: string,
  files: [],
  isLiked: number,
  likedNumber: number[],
  sendAt: number,
  commentNumber: number,
  likeNumber: number,
  createdBy: string,
}


