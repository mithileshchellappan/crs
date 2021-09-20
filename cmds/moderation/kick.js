const Commando = require("discord.js-commando");

module.exports = class KickCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "kick",
      group: "moderation",
      memberName: "kick",
      description: "Kicks member from the server",
      clientPermissions: ["KICK_MEMBERS"],
      userPermissions: ["KICK_MEMBERS"]
    });
  }

  async run(message) {
    const target = message.mentions.users.first();
    if (!target) return message.reply("Specify someone to kick");

    const { guild } = message;

    const member = guild.members.cache.get(target.id);

    if (!member.kickable) return message.reply("You noob, I can't kick them");

    member.kick()

    return message.channel.send({
      embed: {
        color: "RED",
        description: `\`${target.username}#${target.discriminator}\` is kicked `
      }
    });
  }
};
