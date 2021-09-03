"use strict";

var Discord = require('discord.js');

var client = new Discord.Client();

var config = require('./config.json');

var privateMessage = require('./pvt-dm');

client.on('ready', function () {
  console.log('BOT READY');
  privateMessage(client, 'ping', 'pong');
  client.users.fetch('452065156848025631').then(function (user) {
    user.send('oombu');
  });
});
client.login(config.token);