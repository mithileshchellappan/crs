const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const command = require("./commands");

client.on("ready", () => {
  console.log("BOT READY");

  command(client, "createtextchannel", (message) => {
    const name = message.content.replace("!createtextchannel ", "");
    const categoryid = message.channel.parentID;
    if (name !== "") {
      message.guild.channels
        .create(name, {
          type: "text"
        })
        .then((channel) => {
          channel.setParent(categoryid);
        });
    }
  });

  command(client, "createvoicechannel", (message) => {
    const name = message.content.replace("!createvoicechannel ", "");
    const categoryid = message.channel.parentID;

    if (name !== "") {
      message.guild.channels
        .create(name, {
          type: "voice" 
        })
        .then((channel) => {
            channel.setParent(categoryid);
            channel.setUserLimit(40);
        });
    }
  });
});

client.login(config.token);
