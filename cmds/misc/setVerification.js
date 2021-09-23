const Commando = require("discord.js-commando");
const mongo = require('@util/mongo')
const verificationSchema = require('@schemas/verificationChannels-schema');
const {fetch} = require('@features/verificationChannels')

module.exports = class SetVerificationCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "setverification",
      group: "misc",
      memberName: "setverification",
      description: "Sets verifcation channel for the server",
      userPermissions: ["ADMINISTRATOR"],
      argsType: "multiple"
    });
  }

  async run(message, args) {
    const secs = 3;
    if (args.length !== 2)
      return message
        .reply("Provide emoji and role ID to react with")
        .then((message) => message.delete({ timeout: secs * 1000 }));

    const { guild, channel } = message;
    let emoji = args[0];
    if (emoji.includes(":")) {
      const split = emoji.split(":");
      const emojiName = split[1];

      emoji = guild.emojis.cache.find((emoji) => {
        return emojiName === emoji.name;
      });
    }
    console.log(emoji);
    const roleId = args[1];

    const role = guild.roles.cache.get(roleId);

    if (!role) {
      await message
        .reply("That role does not exist")
        .then((msgs) => msgs.delete({ timeout: 1000 * secs }));
      return message.delete();
    }
    message.delete().then(() => {
      channel.messages.fetch({ limit: 1 }).then(async(results) => {
        const firstMessage = results.first();

        if (!firstMessage)
          return channel
            .send("No message to react to")
            .then((msgs) => msgs.delete({ timeout: 1000 * secs }));

        firstMessage.react(emoji)


        await mongo().then(async mongoose=>{
            try{
                await verificationSchema.findOneAndUpdate({
                    _id:guild.id
                },{
                    _id:guild.id,
                    channelId:channel.id,
                    roleId
                },{
                    upsert:true
                })
            }finally{}
        })

        await fetch(this.client)

      });
    });
  }
};
