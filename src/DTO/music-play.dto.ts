import { Param } from "@discord-nestjs/core";
import { Guild, User } from "discord.js";

export class MusicPlayDTO {
  @Param({description: "Youtube Link"})
  name: string;

}