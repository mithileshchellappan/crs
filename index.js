const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const command = require("./commands");

client.on("ready", () => {
  console.log("BOT READY");

  command(client, "ban", (message) => {
    const { member, mentions } = message;
    
    if (
      member.hasPermission("ADMINISTRATOR") ||
      member.hasPermission("BAN_MEMBERS")
    ) {
      const target = mentions.users.first()
      if(target){
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send('Banned successfully')
      }else{
        message.channel.send('Specify to ban')
      }
    } else {
      message.channel.send(
        `<@${member.id}> You do not have permission to use this command.`
      );
    }
  });

  command(client, "kick", (message) => {
    const { member, mentions } = message;
    
    if (
      member.hasPermission("ADMINISTRATOR") ||
      member.hasPermission("KICK_MEMBERS")
    ) {
      const target = mentions.users.first()
      if(target){
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send('Kicked successfully')
      }else{
        message.channel.send('Specify to kick')
      }
    } else {
      message.channel.send(
        `<@${member.id}> You do not have permission to use this command.`
      );
    }
  });
});

client.login(config.token);
