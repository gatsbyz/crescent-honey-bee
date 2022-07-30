import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  private readonly messages: Message[] = [];

  create(message: CreateMessageDto): Message {
    this.messages.push(message);
    return message;
  }

  findOne(id: number): Message {
    return this.messages[id];
  }

  getHello(): string {
    return 'Hello World!';
  }
}
