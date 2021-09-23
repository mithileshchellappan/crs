const ytdl = require("ytdl-core");

const audio_player = async (guild, song, server_queue, client) => {
  const songQueue = client.queue.get(guild.id);

  const guildMember = guild.members.cache.get(client.user.id);
  if (!song) {
    songQueue.vc.leave();
    guildMember.setNickname('')
    return client.queue.delete(guild.id);
  }

  guildMember.setNickname(song?song.title.substr(0, 30):'');

  console.log(song.title.substr(0, 30));

  console.log(songQueue.songs[0].duration);
  const stream = ytdl(song.url, { filter: "audioonly" });
  songQueue.connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
    songQueue.songs.shift();
    console.log(songQueue.songs);
    audio_player(guild, songQueue.songs[0], server_queue, client);
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
