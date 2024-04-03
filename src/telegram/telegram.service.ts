/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { BotService } from './bot.service';
import { AIHandler } from './handlers';
import { Message } from './types';
@Injectable()
export class TelegramService {
  private logger = new Logger(TelegramService.name);
  private aiHandler: AIHandler;
  constructor(
    private databaseService: DatabaseService,
    private botService: BotService,
  ) {
    this.botService.bot.onText(/.*/, this.onReceiveMessage);
    this.botService.bot.on('callback_query', (query) => {
      const userId = query.message.chat.id;
      const data = query.data;
      const msg: Message = {
        chat: {
          id: userId,
        },
        text: data,
        message_id: query.message.message_id,
      };
      switch (data) {
        case '/activation':
          return this.onReceiveMessage(msg);
        case '/start':
          return this.onStart(msg);
        default:
          return this.onStart(msg);
      }
    });
    this.aiHandler = new AIHandler();
  }
  onStart = async (msg: Message) => {
    const userId = msg.chat.id;

    // await this.databaseService.updateSession(userId, {
    //   state: States.INITIAL_STATE,
    // });
    //update state
    // await this.databaseService.updateSession(userId, {
    //   state: States.AWAITING_FULLNAME,
    // });
    await this.botService.sendMessage(msg, userId, 'What i should call you?');
  };
  onReceiveMessage = async (msg: Message) => {
    const userId = msg.chat.id;
    const name = msg.chat.username || 'Anonymous';
    console.log(name);

    const user = await this.databaseService.updateUser(userId, name);
    const userMessage =
      await this.databaseService.getMessagesByTelegramId(userId);
      let history = [];
    const { replyUser, message, response } = await this.aiHandler.chatWithAI(
      msg,
      userId,
      msg.text,
      history,
    );
    history.push(response)
    await this.botService.sendMessage(msg, userId, replyUser);

    const saveMessage = await this.databaseService.saveMessage(userId, message);
  };
}
