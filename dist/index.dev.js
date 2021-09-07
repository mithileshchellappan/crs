"use strict";

var Discord = require("discord.js");

var client = new Discord.Client();

var config = require("./config.json");

var command = require("./commands");

var sendMessage = require('./send-message');

client.on("ready", function () {
  console.log("BOT READY");
  var guild = client.guilds.cache.get('882640818576433232');
  var channel = guild.channels.cache.get('883399848026599464');
  sendMessage(channel, 'wow', 3);
});
client.login(config.token);