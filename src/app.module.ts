import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './message/message.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), MessagesModule],
})
export class AppModule {}
