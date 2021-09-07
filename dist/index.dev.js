"use strict";

var Discord = require("discord.js");

var client = new Discord.Client();

var config = require("./config.json");

var command = require("./commands");

var welcome = require('./welcome');

client.on("ready", function () {
  console.log("BOT READY");
  welcome(client);
});
client.login(config.token);