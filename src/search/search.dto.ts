import { IsString, IsNotEmpty } from 'class-validator';

export class SearchDto {
  @IsString()
  @IsNotEmpty()
  term: string;
}
