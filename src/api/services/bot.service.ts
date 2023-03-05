import { PrismaService } from './prisma.service';
import {
  OnModuleInit,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';
import { getUserID, UserSession } from '@/utils/discord';
import initClient from '@/bot/main';

type Feature = 'welcome-message';

@Injectable()
export class BotService extends Client implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {
    super({ intents: [GatewayIntentBits.Guilds] });
  }

  onModuleInit() {
    return initClient(this);
  }

  async getEnabledFeatures(guild: string): Promise<Feature[]> {
    const features: Feature[] = [];
    const welcomeMessage = await this.prisma.welcomeMessage.count({
      where: {
        id: guild,
      },
    });

    if (welcomeMessage !== 0) {
      features.push('welcome-message');
    }

    return features;
  }

  async checkPermissions(user: UserSession, guildID: string) {
    const guild = this.guilds.cache.get(guildID);
    if (guild == null)
      throw new HttpException('Guild Not found', HttpStatus.NOT_FOUND);

    const userID = await getUserID(user.access_token);
    const member = await guild?.members.fetch(userID);

    if (
      !member?.permissions.has('Administrator') &&
      guild.ownerId !== member.id
    ) {
      throw new HttpException('Missing permissions', HttpStatus.BAD_REQUEST);
    }
  }
}
