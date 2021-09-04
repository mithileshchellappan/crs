const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const command = require("./commands");

client.on("ready", () => {
  console.log("BOT READY");

  command(client, "help", (message) => {
    message.channel.send(`**!help** - Displays help menu
  **!add** <num1> <num2> - Adds 2 numbers
  **!sub** <num1> <num2> -Subs 2 numbers
    `);
  });

const {prefix} = config
client.user.setPresence({
  activity:{
    name:`Use ${prefix} help`
  }
})

});

client.login(config.token);
