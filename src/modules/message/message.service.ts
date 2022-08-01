import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { MessageRepository } from '../../repositories/message.repository';
import { Message } from '../../schema/message.schema';
import { RelationService } from '../relation/relation.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly relationService: RelationService,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const createdMessage = await this.messageRepository.createMessage(
      createMessageDto,
    );
    const { _id: messageId } = createdMessage;
    const { recipientIds } = createMessageDto;
    await Promise.all(
      recipientIds.map((recipientId) =>
        this.relationService.create(messageId, recipientId),
      ),
    );
    return createdMessage.save();
  }

  async findOne(id: Types.ObjectId): Promise<Message> {
    return await this.messageRepository.getMessageById(id);
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.getAllMessages();
  }
}
