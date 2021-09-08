"use strict";

var path = require("path");

var fs = require("fs");

var Discord = require("discord.js");

var client = new Discord.Client();

var config = require("./config.json");

client.on("ready", function _callee() {
  var baseFile, commandBase, readCommands;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("BOT READY!");
          baseFile = "commandBase.js";
          commandBase = require("./commands/".concat(baseFile));

          readCommands = function readCommands(dir) {
            var files = fs.readdirSync(path.join(__dirname, dir));
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var file = _step.value;
                var stat = fs.lstatSync(path.join(__dirname, dir, file));

                if (stat.isDirectory()) {
                  if (file !== "dist") {
                    readCommands(path.join(dir, file));
                  }
                } else if (file !== baseFile) {
                  var option = require(path.join(__dirname, dir, file));

                  commandBase(client, option);
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          };

          readCommands("commands");

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
client.login(config.token);