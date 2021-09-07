module.exports = (client) => {
  const channelId = "882640818576433235";
  const targetChannelId = "883407850951540836";
  client.on("guildMemberAdd", (member) => {
    console.log(member);

    const message = `Hola amigo <@${member.id}> , welcome to the server! Go to ${member.guild.channels.cache.get(targetChannelId).toString()} for fun`;

    const channel = member.guild.channels.cache.get(channelId);
    channel.send(message);
  });
};
