const Commando = require("discord.js-commando");

module.exports = class PlayCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "vol",
      aliases: ["volume", "setvolume", "v"],
      memberName: "vol",
      group: "music",
      description: "Changes volume"
    });
  }

  async run(message, args) {
    const botVc = message.guild.me.voice.channel;
    const vc = message.member.voice.channel;

    if (!vc || botVc !== vc) {
      if (botVc)
        return message.channel.send(
          `You have to be in <#${botVc.id}> to use this`
        );
      if (!botVc)
        return message.channel.send("You have to be in a **VC** to use this");
    }
    let queue = message.client.queue.get(message.guild.id);

    if(!args){
        return message.channel.send({embed:{description:`Current volume is ${queue.volume}`}})
    }

    if(isNaN(+args))return message.channel.send(`Please provide a number`)

    queue.connection.dispatcher.setVolumeLogarithmic(+args/100)
    queue.volume = +args

    message.react('👌')



  }
};
