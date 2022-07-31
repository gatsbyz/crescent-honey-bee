import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { RelationService } from '../relation/relation.service';
// import { Recipient } from './entities/recipient.entity';

@Injectable()
export class RecipientService {
  constructor(private readonly relationService: RelationService) {}

  async findByMessageId(
    messageId: mongoose.Types.ObjectId,
  ): Promise<Record<'recipientIds', string[]>> {
    const relations = await this.relationService.getRelationsByMessageId(
      messageId,
    );
    return { recipientIds: relations.map((relation) => relation.messageId) };
  }
}
