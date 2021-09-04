"use strict";

var Discord = require("discord.js");

var client = new Discord.Client();

var config = require("./config.json");

var command = require("./commands");

client.on("ready", function () {
  console.log("BOT READY");
  command(client, 'embed', function (message) {
    var logo = 'https://www.facebook.com/images/fb_icon_325x325.png';
    var embed = new Discord.MessageEmbed().setTitle('Example').setURL('https://www.google.com').setAuthor(message.author.username).setImage(logo).setThumbnail(logo).setFooter('a footer', logo).setColor('#00aaFF').addFields({
      name: 'field uno',
      value: 'uno',
      inline: true
    }, {
      name: 'field dos',
      value: 'uno',
      inline: true
    }, {
      name: 'field tres',
      value: 'uno',
      inline: true
    }, {
      name: 'field quadro',
      value: 'quadro'
    });
    message.channel.send(embed);
  });
});
client.login(config.token);