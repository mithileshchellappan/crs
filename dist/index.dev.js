"use strict";

var Discord = require("discord.js");

var client = new Discord.Client();

var config = require("./config.json");

var command = require("./commands");

client.on("ready", function () {
  console.log("BOT READY");
  command(client, ["ping", "test"], function (message) {
    message.channel.send("pong");
  });
  command(client, "servers", function (message) {
    client.guilds.cache.forEach(function (guild) {
      message.channel.send("".concat(guild.name, " has a total of ").concat(guild.memberCount, " mem"));
    });
  });
  command(client, ['cc', 'clearchannel'], function (message) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then(function (results) {
        message.channel.bulkDelete(results);
      });
    }
  });
  command(client, 'status', function (message) {
    var content = message.content.replace('!status', '');

    if (content !== '') {
      client.user.setPresence({
        activity: {
          name: content,
          type: 0
        }
      });
    } else {
      message.channel.send('Type something');
    }
  });
});
client.login(config.token);