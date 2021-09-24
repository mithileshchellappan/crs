const Commando = require("discord.js-commando");
const { MessageEmbed, Message } = require("discord.js");
const audio_player = require("@util/audioPlayerUtils/audioPlayer");

module.exports = class QueueCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "queue",
      aliases: ["q"],
      memberName: "queue",
      group: "music",
      description: "Song queue"
    });
  }

  async run(message, args) {
    const server_queue = this.client.queue.get(message.guild.id);
    if (!server_queue || server_queue.songs.len===0) return message.channel.send("No songs in queue");
    
    let queuedVideos = server_queue.songs;

    const back = "⬅",
      forward = "➡",
      numPerPages = 10;
    let pageContents = [];

    while (queuedVideos.length > 0) {
      pageContents.push(queuedVideos.splice(0, numPerPages));
    }

    let numOfPages = pageContents.length;
    let currentPage = 0;
    let currentListNum = (currentPage + 1) * numPerPages - numPerPages;
    const np = server_queue.songsCopy[server_queue.songIndex]?.title;
    let mainTitle = np ? `Now Playing : ${np}` : "This is the last song";
    let description = `${pageContents[currentPage]
      .map(
        (song, index) =>
          `**${currentListNum + (index + 1)}:** [${song.title}](${song.url})`
      )
      .join("\n")}\n\n`;

    const embed = new MessageEmbed()
      .setTitle(mainTitle)
      .setColor("YELLOW")
      .setDescription(description)
      .setFooter(`Page:${currentPage + 1} of ${numOfPages}`);

    const msg = await message.channel.send({ embed });
    if (numOfPages <= 1) return;

    msg.react(back);
    msg.react(forward);

    const filter = (reaction) =>
      reaction.emoji.name === back || reaction.emoji.name === forward;

    const collector = msg.createReactionCollector(filter, { time: 60000 });

    try {
      collector.on("collect", (reaction, user) => {
        if (user.bot) return;

        queuedVideos = server_queue.songsCopy;
        pageContents = [];

        while (queuedVideos.length > 0) {
          pageContents.push(queuedVideos.splice(0, numPerPages));
        }
        numOfPages = pageContents.length;
        console.log(reaction.emoji.name);
        switch (reaction.emoji.name) {
          case back: {
            currentPage =
              currentPage == 0 ? pageContents.length - 1 : (currentPage -= 1);
            break;
          }
          case forward: {
            currentPage =
              currentPage == pageContents.length - 1 ? 0 : (currentPage += 1);

            break;
          }
        }

        reaction.users.remove(user);

        currentListNum = (currentPage + 1) * numPerPages - numPerPages;
        console.log();
        console.log(currentPage, pageContents[currentPage]);
        description = `${pageContents[currentPage]
          .map(
            (song, index) =>
              `**${currentListNum + (index + 1)}:** [${song.title}](${
                song.url
              })`
          )
          .join("\n")}\n\n`;
        const editEmbed = new MessageEmbed()
          .setTitle(mainTitle)
          .setDescription(description)
          .setFooter(`Page:${currentPage + 1} of ${numOfPages}`);

        msg.edit({ embed: editEmbed });
      });
    } catch (e) {
      message.channel.send("Something went wrong, please try again");
      console.log(e);
    }
  }
};
