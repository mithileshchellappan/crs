"use strict";

var mongo = require('./mongo');

var messageCountSchema = require('./schemas/message-count-schema');

module.exports = function (client) {
  client.on('message', function _callee2(message) {
    var author, id;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            author = message.author;
            id = author.id;
            _context2.next = 4;
            return regeneratorRuntime.awrap(mongo().then(function _callee(mongoose) {
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;
                      _context.next = 3;
                      return regeneratorRuntime.awrap(messageCountSchema.findOneAndUpdate({
                        _id: id
                      }, {
                        $inc: {
                          'messageCount': 1
                        }
                      }, {
                        upsert: true
                      }).exec());

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

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
};