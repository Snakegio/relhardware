import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  id: number;
  @IsNotEmpty()
  name: string;
  location?: string;
  city?: string;
  postalCode?: string;
}
