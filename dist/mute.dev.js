"use strict";

var redis = require("./redis");

var command = require("./commands");

module.exports = function (client) {
  var redisKeyPrefix = "muted-";
  redis.expire(function (message) {
    if (message.startsWith(redisKeyPrefix)) {
      var split = message.split('-');
      var memberId = split[1];
      var guildId = split[2];
      var guild = client.guilds.cache.get(guildId);
      var member = guild.members.cache.get(memberId);
      var role = getRole(guild);
      member.roles.remove(role);
    }
  });

  var getRole = function getRole(guild) {
    return guild.roles.cache.find(function (role) {
      return role.name === "Muted";
    });
  };

  var giveRole = function giveRole(member) {
    var role = getRole(member.guild);

    if (role) {
      member.roles.add(role);
      console.log("Muted " + member.id);
    }
  };

  var onJoin = function onJoin(member) {
    var id, guild, redisClient;
    return regeneratorRuntime.async(function onJoin$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = member.id, guild = member.guild;
            _context.next = 3;
            return regeneratorRuntime.awrap(redis());

          case 3:
            redisClient = _context.sent;

            try {
              redisClient.get("".concat(redisKeyPrefix).concat(id, "-").concat(guild.id), function (err, result) {
                if (err) {
                  console.log(err);
                } else if (result) {
                  giveRole(member);
                } else {
                  console.log("user not muted");
                }
              });
            } finally {
              redisClient.quit();
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  client.on("guildMemberAdd", onJoin);
  command(client, "simjoin", function (message) {
    onJoin(message.member);
  });
  command(client, "mute", function _callee(message) {
    var syntax, member, channel, content, mentions, guild, split, duration, durationType, durations, seconds, target, id, targetMember, redisClient, redisKey;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            syntax = "!mute <@> <duration as a number> <m,h,d or life>";
            member = message.member, channel = message.channel, content = message.content, mentions = message.mentions, guild = message.guild;

            if (member.hasPermission("ADMINISTRATOR")) {
              _context2.next = 5;
              break;
            }

            channel.send("You do not have permission to run this command.");
            return _context2.abrupt("return");

          case 5:
            split = content.trim().split(" ");

            if (!(split.length !== 4)) {
              _context2.next = 9;
              break;
            }

            channel.send("Please use correct command syntax: `".concat(syntax, "` "));
            return _context2.abrupt("return");

          case 9:
            duration = split[2];
            durationType = split[3];

            if (!isNaN(duration)) {
              _context2.next = 14;
              break;
            }

            channel.send("Please provide a number for duration `" + syntax + "`");
            return _context2.abrupt("return");

          case 14:
            durations = {
              m: 60,
              h: 60 * 60,
              d: 60 * 60 * 24,
              life: -1
            };
            console.log(durations[durationType]);

            if (durations[durationType]) {
              _context2.next = 19;
              break;
            }

            channel.send("Please provide a valid duration type `" + syntax + "`");
            return _context2.abrupt("return");

          case 19:
            seconds = duration * durations[durationType];
            target = mentions.users.first();

            if (target) {
              _context2.next = 24;
              break;
            }

            channel.send("Please tag a user to mute");
            return _context2.abrupt("return");

          case 24:
            id = target.id;
            console.log(id);
            targetMember = guild.members.cache.get(id);
            giveRole(targetMember);
            _context2.next = 30;
            return regeneratorRuntime.awrap(redis());

          case 30:
            redisClient = _context2.sent;

            try {
              redisKey = "".concat(redisKeyPrefix).concat(id, "-").concat(guild.id);

              if (seconds < 0) {
                redisClient.set(redisKey, "true");
              } else {
                redisClient.set(redisKey, "true", "EX", seconds);
              }
            } finally {
              redisClient.quit();
            }

          case 32:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
};