"use strict";

var mongo = require("./mongo");

var command = require("./commands");

var welcomeSchema = require("./schemas/welcome-schema");

module.exports = function (client) {
  var cache = {};
  command(client, "setwelcome", function _callee2(message) {
    var member, channel, content, guild, text, split;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            member = message.member, channel = message.channel, content = message.content, guild = message.guild;

            if (member.hasPermission("ADMINISTRATOR")) {
              _context2.next = 4;
              break;
            }

            channel.send("This requires admin access");
            return _context2.abrupt("return");

          case 4:
            text = content;
            split = text.split(" ");

            if (!(split.length < 2)) {
              _context2.next = 9;
              break;
            }

            channel.send("Please provide welcome message");
            return _context2.abrupt("return");

          case 9:
            split.shift();
            text = split.join(" ");
            cache[guild.id] = [channel.id, text];
            _context2.next = 14;
            return regeneratorRuntime.awrap(mongo().then(function _callee(mongoose) {
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;
                      _context.next = 3;
                      return regeneratorRuntime.awrap(welcomeSchema.findOneAndUpdate({
                        _id: guild.id
                      }, {
                        _id: guild.id,
                        channelId: channel.id,
                        text: text
                      }, {
                        upsert: true
                      }));

                    case 3:
                      _context.prev = 3;
                      mongoose.connection.close();
                      return _context.finish(3);

                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[0,, 3, 6]]);
            }));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    });
  });

  var onJoin = function onJoin(member) {
    var guild, data, channelId, text, channel;
    return regeneratorRuntime.async(function onJoin$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            guild = member.guild;
            data = cache[guild.id];

            if (data) {
              _context4.next = 6;
              break;
            }

            console.log('fetching from db');
            _context4.next = 6;
            return regeneratorRuntime.awrap(mongo().then(function _callee3(mongoose) {
              var result;
              return regeneratorRuntime.async(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.prev = 0;
                      _context3.next = 3;
                      return regeneratorRuntime.awrap(welcomeSchema.findOne({
                        _id: guild.id
                      }));

                    case 3:
                      result = _context3.sent;
                      cache[guild.id] = data = [result.channelId, result.text];

                    case 5:
                      _context3.prev = 5;
                      mongoose.connection.close();
                      return _context3.finish(5);

                    case 8:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, null, null, [[0,, 5, 8]]);
            }));

          case 6:
            channelId = data[0];
            text = data[1];
            channel = guild.channels.cache.get(channelId);
            channel.send(text.replace(/<@>/g, "<@".concat(member.id, ">")));

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    });
  };

  command(client, 'simjoin', function (message) {
    onJoin(message.member);
  });
  client.on('guildMemberAdd', onJoin);
};