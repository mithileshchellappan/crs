const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const command = require("./commands");

const sendMessage = require('./send-message')
client.on("ready", () => {
  console.log("BOT READY");

  const guild = client.guilds.cache.get('882640818576433232')
  const channel = guild.channels.cache.get('883399848026599464')

  sendMessage(channel,'wow',3)
});

client.login(config.token);
