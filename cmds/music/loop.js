const Commando = require("discord.js-commando");

module.exports = class SkipCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "loop",
      memberName: "loop",
      group: "music",
      description: "Loops either queue or song",
      maxArgs: 1
    });
  }

  async run(message, args) {
    const server_queue = this.client.queue.get(message.guild.id);
    
    if (message.member.voice.channel != message.guild.voice.channel)
      return message.channel.send("You have to be in the same channel to skip");
    if (!server_queue) return message.channel.send("There is nothing playing");
    console.log(args);
    const currentSong = server_queue.songs[server_queue.songIndex];
    switch (args) {
      case "song": {
        currentSong.loop = !currentSong.loop;
        message.channel.send(
          `The current song is now ${currentSong.loop ? "" : "not "}looping`
        );
        break;
      }
      case "queue": {
        server_queue.loop = !server_queue.loop;
        message.channel.send(
          `The current queue is now ${server_queue.loop ? "" : "not "}looping`
        );
        break;
      }
    }
  }
};
