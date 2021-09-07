const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const command = require("./commands");

const memberCount = require('./mem-count')
client.on("ready", () => {
  console.log("BOT READY");
  memberCount(client)
});

client.login(config.token);
