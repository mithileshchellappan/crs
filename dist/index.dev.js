"use strict";

var Discord = require("discord.js");

var client = new Discord.Client();

var config = require("./config.json");

var welcome = require('./welcome2');

client.on("ready", function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("BOT READY");
          welcome(client);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
client.login(config.token);