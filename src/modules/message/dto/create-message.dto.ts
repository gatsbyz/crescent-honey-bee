import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsArray()
  @IsNotEmpty()
  readonly recipientIds: string[];
}
