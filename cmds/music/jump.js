const Commando = require("discord.js-commando");
const audio_player = require("@util/audioPlayerUtils/audioPlayer");

module.exports = class JumpCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "jump",
      memberName: "jump",
      group: "music",
      description: "Jumps song"
    });
  }

  async run(message, args) {
    if (args === 0) return;
    args = +args - 1;
    console.log("args", args);
    if (message.member.voice.channel != message.guild.voice.channel)
      return message.channel.send("You have to be in the same channel to skip");
    const server_queue = this.client.queue.get(message.guild.id);

    if (!server_queue)
      return message.channel.send("There are no songs in queue");
    if (!server_queue.songsCopy[+args])
      return message.channel.send("No song in that index");

    console.log(server_queue.songs.length);

    server_queue.songIndex = args;
    if (!server_queue.songs[args])
      return message.channel.send("There is no song in that index");

    audio_player(
      message.guild,
      server_queue.songs[server_queue.songIndex],
      server_queue,
      this.client
    );

    message.react("👌");
  }
};
