import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './modules/message/message.module';
import { RecipientsModule } from './modules/recipient/recipient.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MessagesModule,
    RecipientsModule,
  ],
})
export class AppModule {}
