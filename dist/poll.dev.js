"use strict";

module.exports = function (client) {
  var channelIds = ["884691022184083455"];

  var addReactions = function addReactions(wow) {
    wow.react("👍");
    setTimeout(function () {
      wow.react("👎");
    }, 750);
  };

  client.on('message', function _callee(message) {
    var fetched;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!channelIds.includes(message.channel.id)) {
              _context.next = 4;
              break;
            }

            addReactions(message);
            _context.next = 11;
            break;

          case 4:
            if (!(message.content.toLowerCase() === "!poll")) {
              _context.next = 11;
              break;
            }

            _context.next = 7;
            return regeneratorRuntime.awrap(message["delete"]());

          case 7:
            _context.next = 9;
            return regeneratorRuntime.awrap(message.channel.messages.fetch({
              limit: 1
            }));

          case 9:
            fetched = _context.sent;

            if (fetched && fetched.first()) {
              addReactions(fetched.first());
            }

          case 11:
          case "end":
            return _context.stop();
        }
      }
    });
  });
};