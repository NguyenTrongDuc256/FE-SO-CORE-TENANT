export interface ClassroomList {
  "ClassroomBuildingId": string,
  "BuildingName": string,
  "Name": string,
  "Code": string,
  "Floor": number,
  "NumberOfSeats": number | string,
  "IsRoom": number,
  "IndexOrder": number,
  "IsActive": number,
  "id" ?: string,
}
export interface Building {
  id?: string,
  Name: string,
  IsActive: number,
  NumberOfFloor: number
}
