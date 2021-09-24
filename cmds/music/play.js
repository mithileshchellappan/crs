const Commando = require("discord.js-commando");
const fetch = require("node-fetch");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const audio_player = require("@util/audioPlayerUtils/audioPlayer");
const queue = new Map();

const videoFinder = async (query) => {
  const result = await ytSearch(query);
  return result.videos.length > 1 ? result.videos[0] : null;
};

module.exports = class PlayCommand extends Commando.Command {
  constructor(client) {
    client.ping = "ping";
    client.queue = queue;

    super(client, {
      name: "play",
      aliases: ["play", "p"],
      memberName: "play",
      group: "music",
      description: "Plays music"
    });
  }

  async run(message, args) {
    const vc = message.member.voice.channel;
    const cmd = message.content.split(" ")[0];
    if (!vc)
      return message.channel.send("You need to be in a **VC** to use this");

    const server_queue = queue.get(message.guild.id);
    if (!args.length && server_queue) {
      server_queue.connection.dispatcher.resume();
      message.react("👌");
      return;
    }
    if (!args.length)
      return message.channel.send("Please provide song or link");
    let song = {};

    if (ytdl.validateURL(args[0])) {
      const songInfo = await ytdl.getInfo(args[0]);
      song = {
        title: songInfo.videoDetails.title,
        author: songInfo.videoDetails.author,
        url: songInfo.videoDetails.video_url,
        duration: songInfo.videoDetails.duration,
        requestedby: message.member.id,
        loop:false

      };
    } else {
      const video = await videoFinder(args);
      if (video) {
        song = {
          title: video.title,
          url: video.url,
          author: video.author,
          duration: video.duration,
          requestedby: message.member.id,
          loop:false
        };
      } else {
        return message.channel.send("Error finding video");
      }
    }

    if (!server_queue) {
      const queue_constructor = {
        vc,
        textChannel: message.channel,
        connection: null,
        songs: [],
        announce: true,
        songIndex: 0,
        songsCopy: [],
        shuffle: false,
        queueId: null,
        loop:false
      };

      queue.set(message.guild.id, queue_constructor);
      queue_constructor.songs.push(song);
      queue_constructor.songsCopy.push(song);

      try {
        const connection = await vc.join();
        queue_constructor.connection = connection;
        audio_player(
          message.guild,
          queue_constructor.songs[0],
          queue_constructor,
          this.client
        );
      } catch (e) {
        queue.delete(message.guild.id);
        message.channel.send("There was an error connecting");
        console.log(e);
      }
    } else {
      server_queue.songs.push(song);
      server_queue.songsCopy.push(song);
      message.channel.send({
        embed: {
          title: `Track Queued - Position:${
            server_queue.songs.indexOf(song) + 1
          }`,
          description: song.title,
          color: "BLUE"
        }
      });
      return;
    }
  }
};
