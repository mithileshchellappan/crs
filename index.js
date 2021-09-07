const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
const welcome = require('./welcome2')

client.on("ready", async () => {
  console.log("BOT READY");
  welcome(client)
});

client.login(config.token);
