// const client = new Discord.Client({
//   ws: { properties: { $browser: "Discord Android" } },
// });
require("module-alias/register");
const colors = require("colors");

const Discord = require("discord.js");
const Commando = require("discord.js-commando");
const path = require("path");
const { MongoClient } = require("mongodb");
const MongoDBProvider = require("commando-provider-mongo").MongoDBProvider;
const { DiscordSR } = require('discord-speech-recognition');

const config = require("@root/config.json");
const loadCommands = require("@root/commands/load-commands");
const commandBase = require("@root/commands/commandBase");
const loadFeatures = require("@root/features/loadFeatures");

const client = new Commando.CommandoClient({
  owner: config.ownerId,
  commandPrefix: config.prefix,
  ws: { properties: { $browser: "Discord Android" } }
});
client.setProvider(
  MongoClient.connect(config.mongoPath)
    .then((client) => {
      return new MongoDBProvider(client, "crs");
    })
    .catch((err) => console.log(err))
);

const discordSR = new DiscordSR(client);

client.on("ready", async () => {
  console.log("BOT READY!".green.bgRed);
  console.log(client.token);
  client.registry
    .registerGroups([
      ["misc", "Misc Commands"],
      ["moderation", "Moderation Commands"],
      ["economy", "Commands for economy"],
      ["giveaway", "Manages giveaways"],
      ["games", "games gives fun"],
      ["discordapplications", "Enables YouTube together"],
      ["music", "Music"]
    ])

    .registerDefaults()
    .registerCommandsIn({
      filter: /^([^.].*)\.(js|ts)$/,
      dirname: path.join(__dirname, "cmds")
    });

  // commandBase.loadPrefixes(client)
  // loadCommands(client);
  loadFeatures(client)
});



client.login(config.token);
