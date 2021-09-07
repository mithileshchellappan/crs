const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const command = require("./commands");

const welcome = require('./welcome')

client.on("ready", () => {
  console.log("BOT READY");
  welcome(client)
});

client.login(config.token);
