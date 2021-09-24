const ytdl = require("ytdl-core");
const getStream = (url) => {
  return ytdl(url, { filter: "audioonly" });
};

const audio_player = async (guild, song, server_queue, client) => {
  const songQueue = client.queue.get(guild.id);

  const guildMember = guild.members.cache.get(client.user.id);
  if (!song) {
    songQueue.vc.leave();
    guildMember.setNickname("");
    return client.queue.delete(guild.id);
  }

  guildMember.setNickname(song ? song.title.substr(0, 30) : "");

  const stream = getStream(song.url)
  songQueue.connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
    songQueue.songIndex += 1
    console.log(songQueue.songs);
    audio_player(guild, songQueue.songs[songQueue.songIndex], server_queue, client);
  });

  songQueue.announce &&
    (await songQueue.textChannel.send({
      embed: {
        description: song.title,
        color: "BLUE"
      }
    }));
};

module.exports = audio_player;

module.exports.getStream = getStream;
