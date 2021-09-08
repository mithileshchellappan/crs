"use strict";

var redis = require("redis");

var _require = require("./config.json"),
    redisPath = _require.redisPath;

module.exports = function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
            var client = redis.createClient({
              url: redisPath
            });
            client.on("error", function (err) {
              console.log("redis error:", err);
              client.quit();
              reject(err);
            });
            client.on('ready', function () {
              resolve(client);
            });
          }));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.expire = function (callback) {
  var expired = function expired() {
    var sub = redis.createClient({
      url: redisPath
    });
    sub.subscribe('__keyevent@0__:expired', function () {
      sub.on('message', function (channel, message) {
        callback(message);
      });
    });
  };

  var pub = redis.createClient({
    url: redisPath
  });
  pub.send_command('config', ['set', 'notify-keyspace-events', 'Ex'], expired());
};