import { Module } from "@nestjs/common";
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from "src/bot.gateway";
import { MusicCommand } from "./music.command";

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [BotGateway, MusicCommand],
})
export class MusicModule {}