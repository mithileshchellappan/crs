const mongo = require("@util/mongo");
const profileSchema = require("@schemas/profile-schema");

const coinsCache = {};

module.exports = (client) => {};

module.exports.addCoins = async (guildId, userId, coins) => {
  return await mongo().then(async (mongoose) => {
    try {
      console.log("find one and update");
      const result = await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId
        },
        {
          guildId,
          userId,
          $inc: {
            coins
          }
        },
        {
          upsert: true,
          new: true
        }
      );
      coinsCache[`${guildId}-${userId}`] = result.coins;
      return result.coins;
    } finally {
      // mongoose.connection.close();
    }
  });
};

module.exports.getCoins = async (guildId, userId) => {
  const cachedValue = coinsCache[`${guildId}-${userId}`];
  if (cachedValue) return cachedValue;

  return await mongo().then(async (mongoose) => {
    try {
      console.log("running findOne()");

      const result = await profileSchema.findOne({
        guildId,
        userId
      });

      console.log(result);

      let coins = 0;
      if (result) {
        coins = result.coins;
      } else {
        console.log("inserting a document");
        await new profileSchema({
          guildId,
          userId,
          coins
        }).save();
      }

      coinsCache[`${guildId}-${userId}`] = coins;
      return coins;
    } finally {
      // mongoose.connection.close();
    }
  });
};
