const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
const eval = require('./eval')
client.on("ready", async () => {
  console.log("BOT READY");
  eval(client)
});

client.login(config.token);
