"use strict";

var Discord = require("discord.js");

var client = new Discord.Client();

var config = require("./config.json");

var command = require("./commands");

client.on("ready", function () {
  console.log("BOT READY");
  command(client, "ban", function (message) {
    var member = message.member,
        mentions = message.mentions;

    if (member.hasPermission("ADMINISTRATOR") || member.hasPermission("BAN_MEMBERS")) {
      var target = mentions.users.first();

      if (target) {
        var targetMember = message.guild.members.cache.get(target.id);
        targetMember.ban();
        message.channel.send('Banned successfully');
      } else {
        message.channel.send('Specify to ban');
      }
    } else {
      message.channel.send("<@".concat(member.id, "> You do not have permission to use this command."));
    }
  });
  command(client, "kick", function (message) {
    var member = message.member,
        mentions = message.mentions;

    if (member.hasPermission("ADMINISTRATOR") || member.hasPermission("KICK_MEMBERS")) {
      var target = mentions.users.first();

      if (target) {
        var targetMember = message.guild.members.cache.get(target.id);
        targetMember.kick();
        message.channel.send('Kicked successfully');
      } else {
        message.channel.send('Specify to kick');
      }
    } else {
      message.channel.send("<@".concat(member.id, "> You do not have permission to use this command."));
    }
  });
});
client.login(config.token);