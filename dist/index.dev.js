"use strict";

var Discord = require("discord.js");

var client = new Discord.Client();

var config = require("./config.json");

var command = require("./commands");

var poll = require("./poll");

client.on("ready", function () {
  console.log("BOT READY");
  poll(client);
});
client.login(config.token);