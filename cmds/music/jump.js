const Commando = require("discord.js-commando");
const audio_player = require("@util/audioPlayerUtils/audioPlayer");

module.exports = class JumpCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "jump",
      aliases: ["skipto"],
      memberName: "jump",
      group: "music",
      description: "Jumps song",
      minArgs: 1,
      maxArgs: 1
    });
  }

  async run(message, args) {
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
        embed: {
          description: `There are no songs in queue`,
          color: "BLUE"
        }
      });

    if (isNaN(args)) {
      return message.channel.send({ embed: {
          description:'Value must be a number',
          color:'BLUE'
      }
     });
    }

    queue.playing = true

    if(queue.loop){
        for(let i=0;i<parseInt(args)-(1+1);i++){
            var delta = queue.queue.shift()
            queue.queue.push(delta)
        }
    }else{
        queue.queue = queue.queue.slice(parseInt(args)-(1+1))
    }

    try{
        queue.connection.dispatcher.end()
    }catch (e){
        console.log(e)
        message.client.queue.delete(message.guild.id)
        queue.vc.leave()
    }


    message.react("👌");
  }
};
