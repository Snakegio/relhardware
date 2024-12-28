import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  id: number;
  @IsNotEmpty()
  name: string;
  location?: string;
}
