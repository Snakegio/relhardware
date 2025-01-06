import { ICompany } from '@relhardware/dto-shared';

export class CompanyResponseDto implements ICompany {
  id: number;
  name: string;
  location: string;
  city: string;
  postalCode: string;
}
