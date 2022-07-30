import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schema/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
// import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  // private readonly messages: Message[] = [];

  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const createdCat = new this.messageModel(createMessageDto);
    return createdCat.save();
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async findOne(messageId: string): Promise<Message> {
    return this.messageModel.findOne({ messageId }).exec();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
