import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@ApiBearerAuth()
@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: 'Create message' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageService.create(createMessageDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found message',
    type: Message,
  })
  findOne(@Param('id') id: string): Promise<Message> {
    return this.messageService.findOne(id);
  }

  @Get()
  findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }
}
