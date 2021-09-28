const Commando = require("discord.js-commando");

module.exports = class SkipCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "clear",
      memberName: "clear",
      group: "music",
      description: "Clears queue"
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
    if (!queue)
      return message.channel.send({
          embed:{
              description:`There are no songs in queue`,
              color:`BLUE`
          }
      })
    queue.connection.dispatcher.end();
    queue.queue = [];
    message.client.queue.delete(message.guild.id)
    const guildMember = message.guild.members.cache.get(
        message.client.user.id
      );
      guildMember.setNickname("");
    message.react('👌')
  }
};
