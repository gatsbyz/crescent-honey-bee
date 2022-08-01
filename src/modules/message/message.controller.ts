import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { toObjectId } from '../../util';
import { isValidObjectId } from 'mongoose';

@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({ summary: 'Create message' })
  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return await this.messageService.create(createMessageDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find message' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Message ID',
  })
  async findOne(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }
    return await this.messageService.findOne(toObjectId(id));
  }

  @ApiOperation({ summary: 'Get all messages' })
  @Get()
  async findAll() {
    return await this.messageService.findAll();
  }
}
