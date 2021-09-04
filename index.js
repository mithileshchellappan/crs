const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const roleAssign = require('./role-assign')
const command = require("./commands");

client.on("ready", () => {
  console.log("BOT READY");
   roleAssign(client)
});

client.login(config.token);
