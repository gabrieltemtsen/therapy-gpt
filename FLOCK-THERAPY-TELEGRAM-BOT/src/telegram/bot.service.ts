/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

import * as dotenv from 'dotenv';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Message } from './types';

dotenv.config();
const TelegramBot = require('node-telegram-bot-api');
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
@Injectable()
export class BotService {
  public readonly bot: any;
  private logger = new Logger(BotService.name);
  constructor() {
    this.bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
    this.bot.on('polling_error', (error) => {
      console.error(error);
    });
  }

  sendMessage = async (
    msg: Message,
    userId: string,
    message: string,
    keyboards?: any,
    replying = false,
  ) => {
    const options = {
      reply_to_message_id: replying ? msg.message_id : null,
      reply_markup: {
        inline_keyboard: keyboards,
        resize_keyboard: true,
      },
    };
    console.log(options);
    await this.bot.sendMessage(userId, message, options);
  };
}
