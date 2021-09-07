module.exports = (client) => {
  const channelId = "884702378752876544";

  const updateMembers = (guild) => {
    const channel = guild.channels.cache.get(channelId);
    channel.setName(`Members: ${guild.memberCount.toLocaleString()}`);
  };

  client.on('guildMemberAdd',member=>updateMembers(member.guild))
  client.on('guildMemberRemove',member=>updateMembers(member.guild))

//   const guild = client.guilds.cache.get('882640818576433232')
//   updateMembers(guild)
};
