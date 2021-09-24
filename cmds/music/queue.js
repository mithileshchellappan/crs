const Commando = require("discord.js-commando");
const audio_player = require("@util/audioPlayerUtils/audioPlayer");

module.exports = class QueueCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "queue",
      aliases: ["q"],
      memberName: "queue",
      group: "music",
      description: "Jumps song"
    });
  }

  async run(message, args) {
      const server_queue = this.client.queue.get(message.guild.id);
      if(!server_queue) return message.channel.send('No songs in queue')
      console.log('1',server_queue.songs)
      console.log('2',server_queue.songsCopy)
    // if (args === 0) return;
    // args = +args - 1;
    // console.log("args", args);
    // if (message.member.voice.channel != message.guild.voice.channel)
    //   return message.channel.send("You have to be in the same channel to skip");

    // if (!server_queue)
    //   return message.channel.send("There are no songs in queue");
    // if (!server_queue.songsCopy[+args])
    //   return message.channel.send("No song in that index");

    // console.log(server_queue.songs.length)
    
    // const song = server_queue.songs[args]
    // server_queue.songs.splice(0,args-1)

    // audio_player(message.guild,song,server_queue,this.client)

    // server_queue.connection.play()

    message.react("👌");
  }
};
