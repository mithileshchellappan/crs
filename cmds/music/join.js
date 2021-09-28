const Commando = require("discord.js-commando");
const audio_player = require("@util/audioPlayerUtils/audioPlayer");

module.exports = class JumpCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "join",
      memberName: "join",
      group: "music",
      description: "joins vc",
      minArgs: 1,
      maxArgs: 1,
      userPermissions:['ADMINISTRATOR']
    });
  }

  async run(message, args) {
    const vc = message.member.voice.channel;
    const botVc = message.guild.me.voice.channel;
    vc.join()
    

    
    message.react("👌");
  }
};
