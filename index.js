
const Discord = require("discord.js");
const client = new Discord.Client({
  ws: { properties: { $browser: "Discord Android" } },
});
const config = require("./config.json");

const loadCommands = require('./commands/load-commands')

const advancePolls = require('./advancePolls')

client.on("ready", async () => {
  console.log("BOT READY!");

  loadCommands(client);
  advancePolls(client)
});

client.login(config.token);
