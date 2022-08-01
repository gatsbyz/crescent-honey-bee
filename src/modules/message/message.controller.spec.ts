import { Test, TestingModule } from '@nestjs/testing';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

describe('MessageController', () => {
  let messageController: MessageController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [MessageService],
    }).compile();

    messageController = app.get<MessageController>(MessageController);
  });

  describe('create message', () => {
    it('should return new message"', async () => {
      const testMessage: CreateMessageDto = {
        content: 'test',
        recipientIds: ['recipientId1', 'recipientId2'],
      };
      const response = await messageController.create(testMessage);
      expect(response.content).toBe(testMessage.content);
    });
  });
});
