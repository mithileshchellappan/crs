const Commando = require("discord.js-commando");

module.exports = class NowPlayingCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "pause",
      group: "music",
      memberName: "pause",
      description: "Pauses song"
    });
  }
  async run(message) {
    const server_queue = this.client.queue.get(message.guild.id);
    if (!server_queue)
      return message.reply({
        embed: { color: "RED", description: "No song is currently playing" }
      });

    server_queue.connection.dispatcher.pause()
    message.react('👌')
  }
};
