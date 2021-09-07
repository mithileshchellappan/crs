"use strict";

var mongoose = require('mongoose');

var _require = require('./config.json'),
    mongoPath = _require.mongoPath;

module.exports = function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect(mongoPath, {
            useNewUrlParser: true
          }));

        case 2:
          return _context.abrupt("return", mongoose);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};