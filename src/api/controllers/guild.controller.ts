import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { WelcomeMessage } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';
import { BotService } from '../services/bot.service';

@Controller('/guilds/:guild')
export class GuildController {
  constructor(
    private readonly bot: BotService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async getGuild(@Param('guild') guild: string): Promise<any> {
    const data = this.bot.guilds.cache.get(guild);
    if (data == null) return 'null';

    return {
      id: data.id,
      name: data.name,
      icon: data.icon,
      enabledFeatures: await this.bot.getEnabledFeatures(guild),
    };
  }

  @Get('/features/welcome-message')
  async getFeature(@Param('guild') guild: string) {
    const data = await this.prisma.welcomeMessage.findUnique({
      where: {
        id: guild,
      },
    });
    if (data == null) return null;

    return {
      message: data.message,
      channel: data.channel,
    };
  }

  @Post('/features/welcome-message')
  async enableFeature(@Req() req: AuthRequest, @Param('guild') guild: string) {
    await this.bot.checkPermissions(req.session, guild);

    await this.prisma.welcomeMessage.upsert({
      create: {
        id: guild,
      },
      update: {},
      where: {
        id: guild,
      },
    });

    return 'Success';
  }

  @Patch('/features/welcome-message')
  async updateFeature(
    @Req() req: AuthRequest,
    @Param('guild') guild: string,
    @Body() body: Partial<WelcomeMessage>,
  ) {
    await this.bot.checkPermissions(req.session, guild);

    const updated = await this.prisma.welcomeMessage.update({
      where: {
        id: guild,
      },
      data: {
        ...body,
        id: undefined,
      },
    });

    return updated;
  }

  @Delete('/features/welcome-message')
  async disableFeature(@Param('guild') guild: string, @Req() req: AuthRequest) {
    await this.bot.checkPermissions(req.session, guild);

    await this.prisma.welcomeMessage.delete({
      where: {
        id: guild,
      },
    });

    return 'Success';
  }

  @Get('/channels')
  async getChannels(@Param('guild') guild: string) {
    const channels = await this.bot.guilds.cache.get(guild)?.channels.fetch();
    if (channels == null) return null;

    return [...channels.values()];
  }

  @Get('/roles')
  async getRoles(@Param('guild') guild: string) {
    const roles = await this.bot.guilds.cache.get(guild)?.roles.fetch();
    if (roles == null) return null;

    return [...roles.values()];
  }
}
