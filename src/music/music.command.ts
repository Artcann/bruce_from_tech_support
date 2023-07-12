import {Command, InteractionEvent, Handler} from '@discord-nestjs/core';
import {SlashCommandPipe} from '@discord-nestjs/common';
import {Injectable} from '@nestjs/common';
import { CommandInteraction, GuildMember } from 'discord.js';
import { AudioPlayerStatus, VoiceConnectionStatus, createAudioPlayer, createAudioResource, joinVoiceChannel } from '@discordjs/voice';
import { MusicPlayDTO } from 'src/DTO/music-play.dto';

const ffmpeg = require('fluent-ffmpeg');
const ytdl = require("ytdl-core");

@Command({
  name: 'music',
  description: 'Play Music in a channel',
  defaultMemberPermissions: 'ManageMessages'
})
@Injectable()
export class MusicCommand {
  @Handler()
  async onMusic(options: CommandInteraction): Promise<string> {
    const interactionUser = await options.guild.members.fetch(options.user.id);

    let stream = ytdl("https://www.youtube.com/watch?v=MAfpReqCDxc", {
      quality: 'highestaudio',
      filter: 'audioonly'
    });


    const resource = createAudioResource(stream);

    const player = createAudioPlayer()

    const connection = joinVoiceChannel({
      channelId: interactionUser.voice.channelId,
      guildId: interactionUser.guild.id, 
      adapterCreator: interactionUser.guild.voiceAdapterCreator
    })

    connection.on(VoiceConnectionStatus.Ready, () => {
      console.log('The connection has entered the Ready state - ready to play audio!');
      connection.subscribe(player);
      player.play(resource);
    });

    connection.on('error', error => console.log(error.message));

    connection.on('stateChange', state => console.log(state.status));
    
    player.on('error', error => {
      console.log(error.message);
    })

    player.on(AudioPlayerStatus.Playing, () => {
      console.log('The audio player has started playing!');
    });
    
    return "Hello World";
  }
}