import { Module } from '@nestjs/common';
import { RelationRepository } from 'src/repositories/relation.repository';
import { RelationService } from './relation.service';

@Module({
  imports: [],
  providers: [RelationService, RelationRepository],
})
export class RelationModule {}
