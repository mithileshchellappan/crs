const Commando = require("discord.js-commando");

module.exports = class SkipCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "stop",
      memberName: "stop",
      group: "music",
      description: "Stops song"
    });
  }

  async run(message, args) {
    const server_queue = this.client.queue.get(message.guild.id);

    if (message.member.voice.channel != message.guild.voice.channel)
      return message.channel.send("You have to be in the same channel to skip");
    if (!server_queue) return message.channel.send("There is nothing playing");
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
    message.react('👌')
  }
};
