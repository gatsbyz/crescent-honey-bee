import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { RelationService } from '../relation/relation.service';

@Injectable()
export class RecipientService {
  constructor(private readonly relationService: RelationService) {}

  async findByMessageId(
    messageId: Types.ObjectId,
  ): Promise<Record<'recipientIds', string[]>> {
    const relations = await this.relationService.getRelationsByMessageId(
      messageId,
    );
    return { recipientIds: relations.map((relation) => relation.messageId) };
  }
}
