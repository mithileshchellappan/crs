"use strict";

var Discord = require("discord.js");

var client = new Discord.Client();

var config = require("./config.json");

var command = require("./commands");

client.on("ready", function () {
  console.log("BOT READY");
  command(client, "createtextchannel", function (message) {
    var name = message.content.replace("!createtextchannel ", "");
    var categoryid = message.channel.parentID;

    if (name !== "") {
      message.guild.channels.create(name, {
        type: "text"
      }).then(function (channel) {
        channel.setParent(categoryid);
      });
    }
  });
  command(client, "createvoicechannel", function (message) {
    var name = message.content.replace("!createvoicechannel ", "");
    var categoryid = message.channel.parentID;

    if (name !== "") {
      message.guild.channels.create(name, {
        type: "voice"
      }).then(function (channel) {
        channel.setParent(categoryid);
        channel.setUserLimit(40);
      });
    }
  });
});
client.login(config.token);