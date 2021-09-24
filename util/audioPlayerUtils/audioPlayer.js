const ytdl = require("ytdl-core");
const getStream = (url) => {
  return ytdl(url, { filter: "audioonly" });
};

const audio_player = async (guild, song, server_queue, client) => {
  const songQueue = server_queue;

  const guildMember = guild.members.cache.get(client.user.id);
  if (!song) {
    if (!songQueue.loop || !songQueue.songs[0].loop) {
      console.log("inside exit if");
      guildMember.setNickname("");
      return client.queue.delete(guild.id);
    }
  }

  guildMember.setNickname(
    song ? song.title.replace(/ *\([^)]*\) */g, "").substr(0, 30) : ""
  );

  const stream = getStream(song.url);
  songQueue.connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
    if (song.loop) {
      console.log("inside song if");
      songQueue.songs[0].loop = true;

      audio_player(guild, song, server_queue, client);
      return;
    } else if (songQueue.loop) {
      if (songQueue.songs.length === songQueue.songIndex) {
        console.log("inside main if");
        songQueue.songs = songQueue.songsCopy;
      }
      console.log("inside else if");
      audio_player(guild, songQueue.songs[0], songQueue, client);
      return;
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
