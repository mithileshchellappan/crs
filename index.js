const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const command = require("./commands");

const poll = require("./poll")

client.on("ready", () => {
  console.log("BOT READY");

  poll(client);



});

client.login(config.token);
