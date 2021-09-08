"use strict";

var mongoose = require('mongoose');

var messageCountSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  messageCount: {
    type: Number,
    required: true
  }
});
module.exports = mongoose.model('message-counter', messageCountSchema);