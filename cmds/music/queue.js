const Commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const DiscordPagination = require("discord.js-pagination");
module.exports = class QueueCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "queue",
      aliases: ["q"],
      autoAliases: true,
      group: "music",
      description: "Queue",
      memberName: "queue"
    });
  }

  async run(message) {
    const vc = message.member.voice.channel;
    if (!vc)
      return message.channel.send(
        "You must Join a voice channel before using this command!"
      );
    const queue = message.client.queue.get(message.guild.id);
    const embeds = [];

    if (!queue) {
      return message.channel.send({
        embed: { title: "There is nothing in queue!",color:'BLUE' }
      });
    } else if (queue.queue === []) {
      return message.channel.send({
        embed: { title: "There is nothing in queue!",volor:'BLUE' }
      });
    } else {
      try{
        const songs = queue.queue.map(
          (track, id) =>
            `**${id + 1}**[${track.name}](${track.url})-requested by :${
              track.requested
            }`
        );
        let k = 1;
        console.log(queue.queue.length);
        for (let i = 0; i < queue.queue.length; i += 20) {
          let embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription()
            .setDescription(songs.slice(i, i + 19).join("\n"))
            .setFooter(`Page ${k}`);
          embeds.push(embed);
  
          k++;
        }
  
        const emojis = ["⏪", "⏩"];
        DiscordPagination(message, embeds, emojis, 100000);
      }catch (e){
        console.log(e)
      }
    }
  }
};
