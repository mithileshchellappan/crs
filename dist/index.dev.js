"use strict";

var Discord = require("discord.js");

var client = new Discord.Client();

var config = require("./config.json");

var command = require("./commands");

var memberCount = require('./mem-count');

client.on("ready", function () {
  console.log("BOT READY");
  memberCount(client);
});
client.login(config.token);