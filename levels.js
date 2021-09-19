const mongo = require("./mongo");
const profileSchema = require("./schemas/profile-schema");
const {botId} = require('./config.json')
module.exports = (client) => {
  client.on("message", (message) => {
    const { guild, member } = message;
    if (member.id !== botId) {
      addXP(guild.id, member.id, 23, message);
    }
  });
};

const getNeededXP = (level) => level * level * 100;

const addXP = async (guildId, userId, xpToAdd, message) => {
  await mongo().then(async (mongoose) => {
    try {
      const result = await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId
        },
        {
          guildId,
          userId,
          $inc: {
            xp: xpToAdd
          }
        },
        {
          upsert: true,
          new: true
        }
      );

      let { xp, level } = result;
      let needed = getNeededXP(level);

      if (xp >= needed) {
        ++level;
        xp -= needed;

        message.reply(`You are now level ${level} with ${xp} xp.`);

        await profileSchema.updateOne({ guildId, userId }, { level, xp });
      }
    } finally {
      // mongoose.connection.close();
    }
  });
};

module.exports.addXP = addXP;
