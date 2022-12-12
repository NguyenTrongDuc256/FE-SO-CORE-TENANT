export interface ProfileStaff {
  id?: string;
  code: string,
  name: string,
  type: number, //phạm vi
  isImperative: number, // trạng thái
  note: string,
  indexOrder: number,
  isUsed: number
}
