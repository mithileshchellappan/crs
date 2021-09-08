const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");

const messageCount = require('./messageCounter')

client.on("ready", async () => {
  console.log("BOT READY");
  messageCount(client)
});

client.login(config.token);
