"use strict";

var Discord = require('discord.js');

var client = new Discord.Client();

var config = require('./config.json');

var firstMessage = require('./first-message');

var firstMess = require('./first-message');

client.on('ready', function () {
  console.log('BOT READY');
  firstMessage(client, '883399848026599464', 'helloworld!!', ['🔥', '💔', '🍕']);
});
client.login(config.token);