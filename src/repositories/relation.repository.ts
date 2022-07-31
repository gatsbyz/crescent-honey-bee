import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Relation } from 'src/schema/relation.schema';

export class RelationRepository {
  constructor(
    @InjectModel(Relation.name) private readonly relationModel: Model<Relation>,
  ) {}

  async createRelation(
    messageId: mongoose.Types.ObjectId,
    recipientId: string,
  ) {
    // let relation = await this.getRelationByEmail(createRelationDto.email);

    // if (relation) {
    //   throw new ConflictException('Relation already exists');
    // }

    let relation = new this.relationModel({
      messageId,
      recipientId,
    });

    try {
      relation = await relation.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!relation) {
      throw new ConflictException('Relation not created');
    }

    return relation;
  }

  async getRelationsByMessageId(
    messageId: mongoose.Types.ObjectId,
  ): Promise<Relation[]> {
    let relations;
    try {
      relations = await this.relationModel.find({ messageId }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (relations.length === 0) {
      throw new NotFoundException('Relations not found');
    }

    return relations;
  }
}
