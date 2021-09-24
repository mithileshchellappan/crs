const ytdl = require("ytdl-core");
const getStream = (url) => {
  return ytdl(url, { filter: "audioonly" });
};

const audio_player = async (guild, song, server_queue, client) => {
  const songQueue = server_queue;

  console.log(songQueue)

  const guildMember = guild.members.cache.get(client.user.id);
  if (!song) {
    guildMember.setNickname("");
    return client.queue.delete(guild.id);
  }

  guildMember.setNickname(
    song ? song.title.replace(/ *\([^)]*\) */g, "").substr(0, 30) : ""
  );

  const stream = getStream(song.url);
  songQueue.connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
    console.log(songQueue.songs);

    if (song.loop) {
      songQueue.songs[0].loop = true;

      audio_player(guild, song, server_queue, client);
      return;
    } else if (songQueue.loop) {
      songQueue.songs = songQueue.songsCopy;
      audio_player(guild, songQueue.songs[0], songQueue, client);
    }
    songQueue.songIndex += 1;

    audio_player(
      guild,
      songQueue.songs[songQueue.songIndex],
      server_queue,
      client
    );
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
