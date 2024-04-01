import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [TelegramModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
