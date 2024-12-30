import { Transform } from 'class-transformer';

export class AssignationResponseDto {
  id: number;

  @Transform(({ obj }) => obj.user?.id || null) // Restituisce l'ID dell'utente
  userId: number;

  @Transform(({ obj }) => obj.item?.id || null) // Restituisce l'ID dell'elemento
  itemId: number;

  assignationDate: Date;

  modificationDate: Date;

  note: string;
}
