import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageRepository } from 'src/repositories/message.repository';
import { RelationRepository } from 'src/repositories/relation.repository';
import { Message, MessageSchema } from 'src/schema/message.schema';
import { Relation, RelationSchema } from 'src/schema/relation.schema';
import { RelationService } from '../relation/relation.service';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([
      { name: Relation.name, schema: RelationSchema },
    ]),
  ],
  controllers: [MessageController],
  providers: [
    MessageService,
    MessageRepository,
    RelationService,
    RelationRepository,
  ],
})
export class MessagesModule {}
