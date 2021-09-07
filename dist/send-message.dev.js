"use strict";

module.exports = function (channel, text) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
  channel.send(text).then(function (message) {
    if (duration === -1) {
      return;
    }

    setTimeout(function () {
      message["delete"]();
    }, 1000 * duration);
  });
};