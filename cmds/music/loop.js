const Commando = require("discord.js-commando");

module.exports = class SkipCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "loop",
      memberName: "loop",
      group: "music",
      description: "Loops either queue or song",
    });
  }

  async run(message, args) {
    const queue = message.client.queue.get(message.guild.id);

  if (!queue)
    return message.channel.send(
      ":x: There are no songs playing in this server"
    );

  queue.loop = !queue.loop;
  message.react('👌')
    
  }
};
