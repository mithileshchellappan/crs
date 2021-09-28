const Commando = require("discord.js-commando");

module.exports = class SkipCommand extends Commando.Command {
    constructor(client) {
      super(client, {
        name: "skip",
        aliases: ["s", "next", "n"],
        memberName: "skip",
        group: "music",
        description: "Skips song"
      });
    }
  
    async run(message, args) {
        const vc = message.member.voice.channel;
        if (!vc)
          return message.channel.send(
            "You must Join a voice channel before using this command!"
          );
        let queue = message.client.queue.get(message.guild.id);
        if (!queue)
          return message.channel.send(
            {
                embed:`No songs are playing currently`
            }
          );
        console.log(queue)
        queue.connection.dispatcher.end('skipped');
        message.react('👌')
    }
  };