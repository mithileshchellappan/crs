const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const command = require("./commands");

client.on("ready", () => {
  console.log("BOT READY");

  command(client, ["ping", "test"], (message) => {
    message.channel.send("pong");
  });

  command(client, "servers", (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} mem`
      );
    });
  });

  command(client,['cc','clearchannel'],message=>{
      if(message.member.hasPermission('ADMINISTRATOR')){
          message.channel.messages.fetch().then(results=>{message.channel.bulkDelete(results)})
      }
  })

  command(client,'status',message=>{
      const content = message.content.replace('!status','')

    if(content!==''){
        client.user.setPresence({
            activity:{
                name:content,
                type:0
            }
        })
    }else{
        message.channel.send('Type something')
    }
  })

});

client.login(config.token);
