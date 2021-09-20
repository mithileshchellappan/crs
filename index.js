// const Discord = require("discord.js");
// const client = new Discord.Client({
//   ws: { properties: { $browser: "Discord Android" } },
// });

const Commando = require("discord.js-commando");
const path = require("path");
const config = require("./config.json");
const loadCommands = require("./commands/load-commands");
const commandBase = require("./commands/commandBase");
const levels = require("./levels");

const client = new Commando.CommandoClient({
  owner: "452065156848025631",
  commandPrefix: config.prefix,
  ws:{properties:{$browser:"Discord Android"}}
});

client.on("ready", async () => {
  console.log("BOT READY!");

  client.registry
  .registerGroups([
    ['misc','Misc Commands'],
    ['moderation','Moderation Commands']
  ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, "cmds"));

  // commandBase.loadPrefixes(client)
  // loadCommands(client);
  // levels(client)
});

client.login(config.token);
