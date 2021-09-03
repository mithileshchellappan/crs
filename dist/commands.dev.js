"use strict";

var _require = require('./config.json'),
    prefix = _require.prefix;

module.exports = function (client, aliases, callback) {
  if (typeof aliases === 'string') {
    aliases = [aliases];
  }

  client.on('message', function (message) {
    var content = message.content;
    aliases.forEach(function (alias) {
      var command = "".concat(prefix).concat(alias);

      if (content.startsWith("".concat(command, " ")) || content === command) {
        console.log("Running command ".concat(command));
        callback(message);
      }
    });
  });
};