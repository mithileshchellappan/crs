const Commando = require("discord.js-commando");
const fetch = require("node-fetch");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const queue = new Map();

const videoFinder = async (query) => {
  const result = await ytSearch(query);
  return result.videos.length > 1 ? result.videos[0] : null;
};

module.exports = class PlayCommand extends Commando.Command {
  constructor(client) {
    client.ping = "ping";
    super(client, {
      name: "play",
      aliases: ["play", "p", "skip", "next", "s"],
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
    if (cmd === `${message.guild.commandPrefix}play`) {
      if (!args.length)
        return message.channel.send("Please provide song or link");
      let song = {};

      if (ytdl.validateURL(args[0])) {
        const songInfo = await ytdl.getInfo(args[0]);
        song = {
          title: songInfo.videoDetails.title,
          author: songInfo.videoDetails.author,
          url: songInfo.videoDetails.video_url
        };
      } else {
        const video = await videoFinder(args);
        if (video) {
          song = { title: video.title, url: video.url, author: video.author };
        } else {
          return message.channel.send("Error finding video");
        }
      }

      if (!server_queue) {
        const queue_constructor = {
          vc,
          textChannel: message.channel,
          connection: null,
          songs: []
        };

        queue.set(message.guild.id, queue_constructor);
        queue_constructor.songs.push(song);

        try {
          const connection = await vc.join();
          queue_constructor.connection = connection;
          video_player(message.guild, queue_constructor.songs[0], server_queue);
        } catch (e) {
          queue.delete(message.guild.id);
          message.channel.send("There was an error connecting");
          console.log(e);
        }
      } else {
        server_queue.songs.push(song);
        return message.channel.send(`**${song.title}** is added to queue`);
      }
    } else if (cmd === `${message.guild.commandPrefix}skip`)
      skip_song(message, server_queue, this.client);
    else if (cmd === `${message.guild.commandPrefix}stop`)
      stop_song(message, server_queue);
  }
};

const video_player = async (guild, song, server_queue) => {
  const songQueue = queue.get(guild.id);

  if (!song) {
    songQueue.vc.leave();
    return queue.delete(guild.id);
  }

  const stream = ytdl(song.url, { filter: "audioonly" });
  songQueue.connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
    songQueue.songs.shift();
    console.log(songQueue.songs);
    video_player(guild, songQueue.songs[0], server_queue);
  });

  await songQueue.textChannel.send(`Now playing **${song.title}**`);
};

const skip_song = (message, server_queue, client) => {
  if (message.member.voice.channel != message.guild.voice.channel)
    return message.channel.send("You have to be in the same channel to skip");
  if (!server_queue) return message.channel.send("There are no songs in queue");

  server_queue.connection.dispatcher.end();
};

const stop_song = (message, server_queue) => {
  if (message.member.voice.channel != message.guild.voice.channel)
    return message.channel.send("You have to be in the same channel to skip");
  if (!server_queue) return message.channel.send("There is nothing playing");
  server_queue.songs=[]
  server_queue.connection.dispatcher.end()

};
