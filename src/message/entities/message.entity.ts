import { ApiProperty } from '@nestjs/swagger';

export class Message {
  /**
   * Unique ID for each message
   */
  messageId: string;

  @ApiProperty({ description: 'Content of the message' })
  content: string;

  @ApiProperty({ description: 'Sender of the message' })
  sender_id: string;

  @ApiProperty({ description: 'Created time of the message' })
  created_at: Date;
}
