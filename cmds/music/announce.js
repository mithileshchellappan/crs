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
    const vc = message.member.voice.channel;
    const botVc = message.guild.me.voice.channel;
    if (!vc) {
      if (botVc)
        return message.channel.send(
          `You have to be in <#${botVc.id}> to use this`
        );
      if (!botVc)
        return message.channel.send("You have to be in a **VC** to use this");
    }
    let queue = message.client.queue.get(message.guild.id);
    queue.announce = !queue.announce;
    message.channel.send({
      embed: {
        color: "BLUE",
        description: `Now playing messages will ${
          !queue.announce ? "not " : ""
        }be announced`
      }
    });
  }
};
