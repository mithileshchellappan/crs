"use strict";

var Discord = require("discord.js");

var client = new Discord.Client();

var config = require("./config.json");

var command = require("./commands");

client.on("ready", function () {
  console.log("BOT READY");
  command(client, 'serverinfo', function (message) {
    var guild = message.guild; // console.log(guild)

    var name = guild.name,
        region = guild.region,
        memberCount = guild.memberCount,
        owner = guild.owner,
        afkTimeout = guild.afkTimeout;
    var icon = guild.iconURL(); // console.log(name,region,memberCount,icon,owner.user.tag,afkTimeout )

    var embed = new Discord.MessageEmbed().setTitle("Server info for **".concat(name, "**")).setThumbnail(icon).addFields({
      name: 'Region',
      value: region
    }, {
      name: 'Members',
      value: memberCount
    }, {
      name: 'Owner',
      value: owner.user.tag
    }, {
      name: 'AFK Timeout',
      value: afkTimeout / 60
    });
    message.channel.send(embed);
  });
});
client.login(config.token);