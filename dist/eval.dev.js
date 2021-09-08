"use strict";

var command = require('./commands');

var ownerId = '';
var channelId = '';

module.exports = function (client) {
  command(client, 'eval', function (message) {
    var member = message.member,
        channel = message.channel,
        content = message.content;

    if (member.id === ownerId && channel.id === channelId) {
      try {
        var result = eval(content.replace('!eval', ''));
        channel.send(result);
      } catch (e) {
        channel.send('```' + e + '```');
      }
    }
  });
};