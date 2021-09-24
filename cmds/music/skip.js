const Commando = require("discord.js-commando");
const audio_player = require("@util/audioPlayerUtils/audioPlayer");

module.exports = class SkipCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "skip",
      aliases: ["s", "next", "n"],
      memberName: "skip",
      group: "music",
      description: "Skips song"
    });
  }

  async run(message, args) {
    if (message.member.voice.channel != message.guild.voice.channel)
      return message.channel.send("You have to be in the same channel to skip");
    const server_queue = this.client.queue.get(message.guild.id);

    if (!server_queue)
      return message.channel.send("There are no songs in queue");
    if (!server_queue.songs[server_queue.songIndex + 1])
      return message.channel.send("There is no song to skip");
    server_queue.songIndex += 1;

    audio_player(
      message.guild,
      server_queue.songs[server_queue.songIndex],
      server_queue,
      this.client
    );

    message.react("👌");
  }
};
