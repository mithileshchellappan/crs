const Commando = require("discord.js-commando");

module.exports = class NowPlayingCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "nowplaying",
      aliases: ["np"],
      group: "music",
      memberName: "nowplaying",
      description: "Now playing song"
    });
  }
  async run(message) {
    const server_queue = this.client.queue.get(message.guild.id);
    if (!server_queue)
      return message.reply({
        embed: { color: "RED", description: "No song is currently playing" }
      });

    const song = server_queue.songs[0];

    message.channel.send({
      embed: {
        title: song.title,
        description: `- Requested by <@!${song.requestedby}>\nDuration:${song.duration}`,
        color:'BLUE'
      }
    });
  }
};
