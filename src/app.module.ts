import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './modules/message/message.module';
import { RecipientsModule } from './modules/recipient/recipient.module';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost/${process.env.DB_NAME}`),
    MessagesModule,
    RecipientsModule,
  ],
})
export class AppModule {}
