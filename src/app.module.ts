import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';
import { MusicModule } from './music/music.module';
import { DiscordConfigService } from './configuration/DiscordConfig';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  DiscordModule.forRootAsync({
    useClass: DiscordConfigService
  }),
  MusicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
