"use strict";

module.exports = {
  commands: 'ping',
  expectedArgs: '<num1> <num2>',
  minArgs: 0,
  maxArgs: 0,
  callback: function callback(message, argumnts, text) {
    message.reply('pong');
  }
};