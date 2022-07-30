import { Module } from '@nestjs/common';
import { MessagesModule } from './message/message.module';

@Module({
  imports: [MessagesModule],
})
export class AppModule {}
