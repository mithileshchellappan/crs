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
    const server_queue = this.client.queue.get(message.guild.id);
    if (!server_queue) return message.channel.send("No songs in queue");
    if(!server_queue.shuffle){
        server_queue.shuffle = !server_queue.shuffle
        server_queue.songs = this.shuffleArray(server_queue.songs)
        message.channel.send('The queue is now shuffled')
    }else{
        server_queue.shuffle = !server_queue.shuffle
        server_queue.songs = server_queue.songsCopy
        message.channel.send('The queue is now un-shuffled')

    }
    message.react("👌");
  }
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }
};
