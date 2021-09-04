"use strict";

var Discord = require("discord.js");

var client = new Discord.Client();

var config = require("./config.json");

var roleAssign = require('./role-assign');

var command = require("./commands");

client.on("ready", function () {
  console.log("BOT READY");
  roleAssign(client);
});
client.login(config.token);