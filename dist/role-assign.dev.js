"use strict";

var firstMessage = require("./first-message");

module.exports = function (client) {
  var channelId = "883407850951540836";

  var getEmoji = function getEmoji(emojiName) {
    return client.emojis.cache.find(function (emoji) {
      return emoji.name === emojiName;
    });
  };

  var emojis = {
    javascript: 'javascript',
    python: 'python'
  };
  var reactions = [];
  var emojiText = "";

  for (var key in emojis) {
    var emoji = getEmoji(key);
    reactions.push(emoji);
    var role = emojis[key];
    emojiText += "".concat(emoji, " = ").concat(role, "\n");
  }

  firstMessage(client, channelId, emojiText, reactions);

  var handleReaction = function handleReaction(reaction, user, add) {
    console.log('reaction');

    if (user.bot) {
      return;
    }

    var emoji = reaction._emoji.name;
    var guild = reaction.message.guild;
    var roleName = emojis[emoji];
    if (!roleName) return;
    var role = guild.roles.cache.find(function (role) {
      return role.name === roleName;
    });
    var member = guild.members.cache.find(function (member) {
      return member.id === user.id;
    });

    if (add) {
      member.roles.add(role);
    } else {
      member.roles.remove(roles);
    }
  };

  client.on("messageReactionAdd", function (reaction, user) {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, true);
    }
  });
  client.on("messageReactionRemove", function (reaction, user) {
    console.log("remove");

    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, false);
    }
  });
};