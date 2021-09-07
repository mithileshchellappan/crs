"use strict";

module.exports = function (client) {
  var channelId = "884702378752876544";

  var updateMembers = function updateMembers(guild) {
    var channel = guild.channels.cache.get(channelId);
    channel.setName("Members: ".concat(guild.memberCount.toLocaleString()));
  };

  client.on('guildMemberAdd', function (member) {
    return updateMembers(member.guild);
  });
  client.on('guildMemberRemove', function (member) {
    return updateMembers(member.guild);
  }); //   const guild = client.guilds.cache.get('882640818576433232')
  //   updateMembers(guild)
};