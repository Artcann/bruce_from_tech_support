import { Injectable, Logger } from '@nestjs/common';
import { Once, On, InjectDiscordClient } from '@discord-nestjs/core';
import { Client, Message} from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(`Bot ${this.client.user.tag} was started!`);
  }
}