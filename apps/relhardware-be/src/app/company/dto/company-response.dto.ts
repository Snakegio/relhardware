import { ICompanyDto } from '@relhardware/dto-shared';

export class CompanyResponseDto implements ICompanyDto {
  id: number;
  name: string;
  location: string;
}
