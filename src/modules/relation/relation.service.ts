import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { RelationRepository } from 'src/repositories/relation.repository';
import { Relation } from 'src/schema/relation.schema';

@Injectable()
export class RelationService {
  constructor(private relationRepository: RelationRepository) {}

  async create(
    messageId: mongoose.Types.ObjectId,
    recipientId: string,
  ): Promise<Relation> {
    const createdRelation = await this.relationRepository.createRelation(
      messageId,
      recipientId,
    );
    return createdRelation.save();
  }

  async getRelationsByMessageId(
    messageId: mongoose.Types.ObjectId,
  ): Promise<Relation[]> {
    return await this.relationRepository.getRelationsByMessageId(messageId);
  }
}
