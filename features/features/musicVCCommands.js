const discordTTS = require("discord-tts");
const { Message } = require("discord.js");
const yt_search = require("yt-search");
const { play } = require("../../cmds/music/play");
module.exports = async (client) => {
  client.on("speech", async (message) => {
    let queue = client.queue.get(message.guild.id);
    try {
      console.log(message.content);
      if (message.content) {
        let contents = message.content.split(" ");
        console.log(contents);
        if (
          contents[0] === "skip" ||
          contents[0] === "jump" ||
          contents[0] === "next"
        )
          skip(queue);
        else if (contents[0] === "play") {
          contents.shift();
          const searched = await (
            await yt_search(contents.join(" "))
          ).videos[0];

          var track = {
            name: searched.title,
            url: searched.url,
            requested: message.member,
            loop: false
          };

          queue.queue.push(track);
          return;
        }else if(message.content === "reduce volume"){
          queue.volume-= 25
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume/100)
        }else if(message.content === "mute"){
          queue.volume===0?queue.volume=100:queue.volume=0
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume/100)
        }else if(message.content ==="gaming"){
          queue.volume = 17
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume/100)
          
        }
      }
    } catch (e) {
      console.log(e);
    }
  });

  async function skip(queue) {
    if (queue.length === 1) {
      return conn.play(discordTTS.getVoiceStream("Nothing in queue"));
    }
    queue.connection.dispatcher.end("skipped");
  }
};
