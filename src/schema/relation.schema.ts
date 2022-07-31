import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Message } from './message.schema';

export type RelationDocument = Relation & Document;

@Schema()
export class Relation {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Message.name,
  })
  messageId: string;

  @Prop({ required: true })
  recipientId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RelationSchema = SchemaFactory.createForClass(Relation);
