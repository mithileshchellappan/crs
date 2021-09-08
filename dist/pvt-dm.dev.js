"use strict";

var _require = require("discord.js"),
    Channel = _require.Channel;

module.exports = function (client, triggerText, replyText) {
  client.on('message', function (message) {
    if (message.content.toLowerCase() === triggerText.toLowerCase()) {
      message.author.send(replyText);
    }
  });
};