export interface IAssignationDto {
  id: number;
  userId: number;
  itemId: number[];
  assignationDate: Date;
  modificationDate: Date;
  note: string;
}
