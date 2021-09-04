"use strict";

var Discord = require("discord.js");

var client = new Discord.Client();

var config = require("./config.json");

var command = require("./commands");

client.on("ready", function () {
  console.log("BOT READY");
  command(client, "help", function (message) {
    message.channel.send("**!help** - Displays help menu\n  **!add** <num1> <num2> - Adds 2 numbers\n  **!sub** <num1> <num2> -Subs 2 numbers\n    ");
  });
  var prefix = config.prefix;
  client.user.setPresence({
    activity: {
      name: "Use ".concat(prefix, " help")
    }
  });
});
client.login(config.token);