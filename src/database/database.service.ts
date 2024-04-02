/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import WeaveDB from 'weavedb-sdk-node';
dotenv.config();

const WEAVEDB_CONTRACT_TX_ID = process.env.CONTRACT_TX_ID;

@Injectable()
export class DatabaseService {
  private db: any;

  //   constructor() {
  //     this.db = new (WeaveDB as any)({
  //       contractTxId: WEAVEDB_CONTRACT_TX_ID,
  //       wallet: '0x7231D8CCF0bcF5678dB30730EfE18F21d520C379',
  //       old: true,
  //       network: 'mainnet'
  //     });
  //     this.initDatabase(); // Call the initialization method
  //   }

  private async initDatabase(): Promise<void> {
    try {
      await this.db.init();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  //   public async updateUser(telegramId: string, userInfo?: any): Promise<void> {
  //     try {
  //       const personData = { name: 'Bob', age: 20 };
  //       const tx = await this.db.add(personData, 'users');
  //       console.log('TX: ', tx);
  //       const user = await this.db.get('users');
  //       console.log('USERS: ', user, userInfo);
  //       //   if (user.) {
  //       //     await this.db.update(telegramId, userInfo);
  //       //   } else {
  //       //     await this.db.create(telegramId, userInfo);
  //       //   }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
}
