"use strict";

var Discord = require("discord.js");

var client = new Discord.Client();

var config = require("./config.json");

client.on("ready", function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("BOT READY");

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
client.login(config.token);