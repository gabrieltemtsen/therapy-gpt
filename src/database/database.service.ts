/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Database } from '@tableland/sdk';
import { jsonFileAliases } from '@tableland/node-helpers';
import { Wallet, getDefaultProvider } from 'ethers';

dotenv.config();

interface UserTableSchema {
  id: number;
  name: string;
  telegramId: string;
}
// async function main() {
//   const privateKey: any = process.env.PRIVATE_KEY;
//   const rpc: any = process.env.RPC_URL;

//   const wallet = new Wallet(privateKey);
//   const provider: any = getDefaultProvider(rpc);
//   const signer: any = wallet.connect(provider);
//   interface Schema {
//     id: number;
//     messages: Text; // Define messages as an array of objects
//     telegramId: string;
//   }

//   const db = new Database<Schema>({
//     signer: signer,
//     aliases: jsonFileAliases('./tableland.aliases.json'),
//   });

//   const prefix: string = 'conversations';

//   const { meta: create } = await db
//     .prepare(
//       `CREATE TABLE ${prefix} (id INTEGER PRIMARY KEY, messages TEXT, telegramId TEXT);`,
//     )
//     .run();

//   console.log(create.txn?.name);
//   console.log('INSERTED');

//   const users_table = 'users_11155111_1470';
//   const conversations_table = 'conversations_11155111_1471';
// }

// main();
const users_table = 'users_11155111_1470';
const conversations_table = 'conversations_11155111_1471';

@Injectable()
export class DatabaseService {
  private db: any;

  constructor() {
    const privateKey: any = process.env.PRIVATE_KEY;
    const rpc: any = process.env.RPC_URL;

    const wallet = new Wallet(privateKey);
    const provider: any = getDefaultProvider(rpc);
    const signer: any = wallet.connect(provider);

    this.db = new Database<any>({
      signer: signer,
      aliases: jsonFileAliases('./tableland.aliases.json'),
    });
  }
  // async createTable() {
  //   console.log('hehehehehe')
  //   const prefix: string = 'test';

  //   const { meta: create } = await this.db
  //     .prepare(
  //       `CREATE TABLE ${prefix} (id INTEGER PRIMARY KEY, messages TEXT, telegramId TEXT);`,
  //     )
  //     .run();

  //   console.log(create.txn?.name);
  //   console.log('INSERTED');
  // }

  async updateUser(telegramId: string, name: string): Promise<void> {
    try {
      const { results } = await this.db
        .prepare(
          `SELECT * FROM ${users_table} WHERE telegramId == ${telegramId};`,
        )
        .run();

      console.log(results);

      if (!results) {
        console.log('nana');
        await this.db
          .prepare(
            `INSERT INTO ${users_table} (name, telegramId) VALUES (?, ?);`,
          )
          .bind(name, telegramId)
          .run();
        console.log('New user created successfully.');
      } else {
        console.log(results);
        console.log('User already exists.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
}
