export interface IAssignationDto {
  id: number;
  userId: string;
  itemId: number[];
  assignationDate: Date;
  modificationDate: Date;
  note: string;
}
