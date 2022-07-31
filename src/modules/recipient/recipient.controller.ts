import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { toObjectId } from '../../util';
import { RecipientService } from './recipient.service';

@ApiTags('recipient')
@Controller('recipient')
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @Get(':messageId')
  @ApiOperation({ summary: 'Gets recipients by messageId' })
  @ApiParam({
    name: 'messageId',
    required: true,
    description: 'Message ID',
  })
  async getRecipientsByMessageId(
    @Param('messageId') messageId: string,
    @Res() res: Response,
  ) {
    if (!isValidObjectId(messageId)) {
      return res.status(HttpStatus.BAD_REQUEST).send('Invalid ID');
    }
    const recipients = await this.recipientService.findByMessageId(
      toObjectId(messageId),
    );
    return res.status(HttpStatus.OK).send(recipients);
  }
}
