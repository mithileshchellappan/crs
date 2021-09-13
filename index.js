
const Discord = require("discord.js");
const client = new Discord.Client({
  ws: { properties: { $browser: "Discord Android" } },
});
const config = require("./config.json");

const loadCommands = require('./commands/load-commands')

client.on("ready", async () => {
  console.log("BOT READY!");

  loadCommands(client);
  
});

client.login(config.token);
