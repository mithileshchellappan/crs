const Commando = require("discord.js-commando");
const audio_player = require("@util/audioPlayerUtils/audioPlayer");

module.exports = class QueueCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "shuffle",
      memberName: "shuffle",
      group: "music",
      description: "Shuffles current queue"
    });
  }

  async run(message, args) {
    const vc = message.member.voice.channel;
    if (!vc)
      return message.channel.send(
        "You must Join a voice channel before using this command!"
      );
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.channel.send(
        {
            embed:{
                description:`No queue to shuffle`
            }
        }
      );
    let songs = queue.queue;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    queue.queue = songs;
    message.client.queue.set(message.guild.id, queue);
  }
  
};
