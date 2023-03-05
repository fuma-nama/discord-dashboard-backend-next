import { BOT_TOKEN } from '@/config';
import { Logger } from '@nestjs/common';
import { Client } from 'discord.js';

export default async function initClient(client: Client) {
  client.on('ready', () => {
    if (client.user != null) {
      Logger.log(`Logged in as ${client.user.tag}!`);
    }
  });

  //init bot client
  await client.login(BOT_TOKEN);
}
