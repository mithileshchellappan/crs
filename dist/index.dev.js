"use strict";

var Discord = require("discord.js");

var client = new Discord.Client();

var config = require("./config.json");

var command = require("./commands");

var mongo = require('./mongo');

var sendMessage = require('./send-message');

client.on("ready", function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("BOT READY");
          _context.next = 3;
          return regeneratorRuntime.awrap(mongo().then(function (mongoose) {
            try {
              console.log('mongodb connected');
            } finally {
              mongoose.connection.close();
            }
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});
client.login(config.token);