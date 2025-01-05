import { Transform } from 'class-transformer';
import { IAssignationDto } from '@relhardware/dto-shared';

export class AssignationResponseDto implements IAssignationDto {
  id: number;
  userId: string;
  @Transform(({ obj }) => obj.item?.id || null) // Restituisce l'ID dell'elemento
  itemId: number[];
  assignationDate: Date;
  modificationDate: Date;
  note: string;
}
