import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString({ message: '문자열이 입력되어야함' })
  content: string;
}
