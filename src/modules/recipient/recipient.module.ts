import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RelationRepository } from 'src/repositories/relation.repository';
import { Relation, RelationSchema } from 'src/schema/relation.schema';
import { RelationService } from '../relation/relation.service';
import { RecipientController } from './recipient.controller';
import { RecipientService } from './recipient.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Relation.name, schema: RelationSchema },
    ]),
  ],
  controllers: [RecipientController],
  providers: [RecipientService, RelationService, RelationRepository],
})
export class RecipientsModule {}
