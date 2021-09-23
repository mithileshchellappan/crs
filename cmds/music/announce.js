const Commando = require("discord.js-commando");

module.exports = class AnnounceStatus extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "announce",
      memberName: "announce",
      group: "music",
      description: "Enable/disable announce"
    });
  }

  async run(message) {
    const server_queue = this.client.queue.get(message.guild.id);
    if (!server_queue) return message.channel.send("Nothing is playing");
    server_queue.announce = !server_queue.announce;
    message.channel.send({
      embed: {
        color: "BLUE",
        description: `Now playing messages will ${
          !server_queue.announce ? "not " : ""
        }be announced`
      }
    });
  }
};
