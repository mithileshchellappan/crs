"use strict";

var mongoose = require('mongoose');

var reqString = {
  type: String,
  required: true
};
var welcomeSchema = mongoose.Schema({
  _id: reqString,
  channelId: reqString,
  text: reqString
});
module.exports = mongoose.model('welcome-channels', welcomeSchema);