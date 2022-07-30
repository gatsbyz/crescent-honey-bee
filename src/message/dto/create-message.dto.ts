import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  readonly messageId: string;

  readonly content: string;

  @IsString()
  readonly sender_id: string;

  @IsDate()
  readonly created_at: Date;
}
