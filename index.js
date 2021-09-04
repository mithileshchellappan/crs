const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const command = require("./commands");

client.on("ready", () => {
  console.log("BOT READY");

  command(client,'serverinfo',message=>{
    const {guild} = message
    // console.log(guild)
    const {name,region,memberCount,owner,afkTimeout} = guild
    const icon = guild.iconURL()
    
    // console.log(name,region,memberCount,icon,owner.user.tag,afkTimeout )

    const embed = new Discord.MessageEmbed()
    .setTitle(`Server info for **${name}**`)
    .setThumbnail(icon)
    .addFields({
      name:'Region',
      value:region
    },{
      name:'Members',
      value:memberCount
    },{
      name:'Owner',
      value:owner.user.tag
    },
    {
      name:'AFK Timeout',
      value:afkTimeout/60
    },
    )

    message.channel.send(embed)
  })

});

client.login(config.token);
