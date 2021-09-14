
const Discord = require("discord.js");
const client = new Discord.Client({
  ws: { properties: { $browser: "Discord Android" } },
});
const config = require("./config.json");

const loadCommands = require('./commands/load-commands')

const levels = require('./levels')
client.on("ready", async () => {
  console.log("BOT READY!");

  loadCommands(client);
  levels(client)
});

client.login(config.token);
