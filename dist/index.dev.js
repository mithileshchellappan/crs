"use strict";

var Discord = require('discord.js');

var client = new Discord.Client();

var config = require('./config.json');

var command = require('./commands');

client.on('ready', function () {
  console.log('BOT READY');
  command(client, ['ping', 'test'], function (message) {
    message.channel.send('pong');
  });
});
client.login(config.token);