import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { DatabaseModule } from 'src/database/database.module';
import { BotService } from './bot.service';

@Module({
  imports: [DatabaseModule],
  providers: [TelegramService, BotService],
  controllers: [TelegramController],
})
export class TelegramModule {}
