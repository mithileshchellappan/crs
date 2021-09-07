"use strict";

module.exports = function (client) {
  var channelId = "882640818576433235";
  var targetChannelId = "883407850951540836";
  client.on("guildMemberAdd", function (member) {
    console.log(member);
    var message = "Hola amigo <@".concat(member.id, "> , welcome to the server! Go to ").concat(member.guild.channels.cache.get(targetChannelId).toString(), " for fun");
    var channel = member.guild.channels.cache.get(channelId);
    channel.send(message);
  });
};