import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
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
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @Res() res: Response,
  ) {
    const newMessage = await this.messageService.create(createMessageDto);
    return res.status(HttpStatus.CREATED).send(newMessage);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find message' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Message ID',
  })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    if (!isValidObjectId(id)) {
      return res.status(HttpStatus.BAD_REQUEST).send('Invalid ID');
    }
    const message = await this.messageService.findOne(toObjectId(id));
    return res.status(HttpStatus.OK).send(message);
  }

  @ApiOperation({ summary: 'Get all messages' })
  @Get()
  async findAll(@Res() res: Response) {
    const messages = await this.messageService.findAll();
    return res.status(HttpStatus.OK).send(messages);
  }
}
