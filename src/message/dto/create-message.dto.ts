import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  readonly messageId: string;

  readonly content: string;

  @IsString()
  readonly senderId: string;

  @IsDate()
  readonly createdAt: Date;
}
