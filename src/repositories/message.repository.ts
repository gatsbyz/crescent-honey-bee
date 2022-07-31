import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateMessageDto } from 'src/modules/message/dto/create-message.dto';
import { Message } from 'src/schema/message.schema';

export class MessageRepository {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto) {
    // let message = await this.getMessageByEmail(createMessageDto.email);

    // if (message) {
    //   throw new ConflictException('Message already exists');
    // }

    let message = new this.messageModel({
      content: createMessageDto.content,
    });

    try {
      message = await message.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!message) {
      throw new ConflictException('Message not created');
    }

    return message;
  }

  async getMessageById(id: mongoose.Types.ObjectId) {
    let message;
    try {
      message = await this.messageModel.findById({ _id: id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }

  async getAllMessages() {
    let message;
    try {
      message = await this.messageModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }
}
