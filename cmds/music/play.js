const Commando = require("discord.js-commando");
const ytdl = require("ytdl-core");
const yt_search = require("yt-search");
const yt_pl = require("ytpl");
const ytpl = require("ytpl");

const queue = new Map();
module.exports = class PlayCommand extends Commando.Command {
  constructor(client) {
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
    const botVc = message.guild.me.voice.channel;
    console.log(args);
    if (!vc) {
      if (botVc)
        return message.channel.send(
          `You have to be in <#${botVc.id}> to use this`
        );
      if (!botVc)
        return message.channel.send("You have to be in a **VC** to use this");
    }
    const setqueue = (id, obj) => this.client.queue.set(id, obj);
    const deletequeue = (id) => this.client.queue.delete(id);
    const error = (err) => message.channel.send(err);

    var track;
    if (!args.length)
      return message.channel.send(`Please provide song name or link`);
    const structure = {
      channel: message.channel,
      vc,
      volume: 100,
      playing: true,
      queue: [],
      connection: null,
      announce:true,
    };

    var list = message.client?.queue?.get(message.guild.id);

    if (ytdl.validateURL(args)) {
      try {
        const ytdata = await ytdl.getBasicInfo(args);
        if (!ytdata) return error("No song found for url");
        track = {
          name: ytdata.videoDetails.title,
          requested: message.author,
          url: ytdata.videoDetails.video_url,
          loop: false
        };
        if (!list) {
          setqueue(message.guild.id, structure);
          structure.queue.push(track);
        } else {
          list.queue.push(track);
          return message.channel.send({
            embed: {
              description: `Queued ${track.name}`,
              color: "BLUE"
            }
          });
        }
      } catch (e) {
        console.log(e);
        return error("Something went wrong try again");
      }
    } else {
      try {
        const searched = await (await yt_search(args)).videos[0];
        if (!searched) {
          try {
            const playlistId = await ytpl.getPlaylistID(args);
            const { items, estimatedItemCount } = await ytpl(playlistId, {
              pages: "Infinity"
            });
            if (!list) {
              setqueue(message.guild.id, structure);
              console.log(items.length);
              for (let item of items) {
                track = {
                  name: item.title,
                  url: item.url,
                  requested: message.author,
                  loop: false
                };
                structure.queue.push(track);
              }
            } else {
              items.forEach((item) => {
                track = {
                  name: item.title,
                  url: item.url,
                  requested: message.author,
                  loop: false
                };
                list.queue.push(track);
              });
            }
            message.channel.send({
              embed: {
                description: `Queued ${estimatedItemCount} items`
              }
            });
          } catch (e) {
            console.log(e);
            return error(`Something went wrong in loading the playlist`);
          }
        } else {
          track = {
            name: searched.title,
            url: searched.url,
            requested: message.member,
            loop: false
          };

          if (!list) {
            setqueue(message.guild.id, structure);
            structure.queue.push(track);
          } else {
            list.queue.push(track);
            return message.channel.send({
              embed: {
                description: `Queued ${track.name}`,
                color: "BLUE"
              }
            });
          }
        }
      } catch (e) {
        console.log(e);
        return error(`Error occured. Please try again`);
      }
    }
    try {
      const join = await vc.join();
      structure.connection = join;
      play(structure.queue[0],message);
    } catch (e) {
      console.log(e);
      deletequeue(message.guild.id);
      return error(`Something went wrong, please try again`);
    }

    
  }
};

async function play(track, message) {
  try {
    const data = message.client.queue?.get(message.guild.id);
    if (!track) {
      return data.channel.send(`Queue is empty`);
    }
    data.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

    const ytdlsource = await ytdl(track.url, {
      filter: "audioonly",
      quality: "highestaudio",
      highWatermark: 1 << 25,
      opusEncoded: true
    });

    const guildMember = message.guild.members.cache.get(
      message.client.user.id
    );
    guildMember.setNickname(
      track ? track.name.replace(/ *\([^)]*\) */g, "").substr(0, 30) : ""
    );
    const player = data.connection.play(ytdlsource).on("finish", () => {
      var removed = data.queue.shift();
      if (data.loop) {
        data.queue.push(removed);
      }
      play(data.queue[0],message);
    });

    player.setVolumeLogarithmic(data.volume / 100);
    data.announce&&data.channel.send({
      embed: {
        title: `Now playing`,
        description: track.name,
        color: "BLUE"
      }
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports.play = play
