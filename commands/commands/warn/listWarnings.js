const mongo = require("@util/mongo");
const warnSchema = require("@schemas/warn-schema");

module.exports = {
  commands: ["listwarnings", "lw"],
  minArgs: 1,
  expectedArgs: "<user @>",
  callback: async (message) => {
    const target = message.mentions.users.first();
    if (!target) return message.reply("Specify user");

    const guildId = message.guild.id;
    const userId = target.id;

    await mongo().then(async (mongoose) => {
      try {
        const results = await warnSchema.findOne({
          guildId,
          userId
        });

        let reply = `Previous warnings for <@${userId}>:\n\n`;
        let embed = "";
        let count = 0;
        for (const warning of results.warning) {
            count++;
          const { author, timestamp, reason } = warning;

          embed += `By ${author} on ${new Date(
            timestamp
          ).toLocaleDateString()} for "${reason}"\n`;
        }

        message.channel.send(reply, {
          embed: {
              title:`Total warnings:  ${count}`,
            description: `\`\`\`${embed}\`\`\``,
            color: "RED"
          }
        });
      } finally {
      }
    });
  }
};
