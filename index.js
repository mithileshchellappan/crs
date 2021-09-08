const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
const mute = require('./mute')

client.on("ready", async () => {
  console.log("BOT READY");
  mute(client)
});

client.login(config.token);
