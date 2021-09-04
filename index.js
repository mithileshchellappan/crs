const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const command = require("./commands");

client.on("ready", () => {
  console.log("BOT READY");

  command(client,'embed',(message)=>{

    const logo = 'https://www.facebook.com/images/fb_icon_325x325.png'
    const embed = new Discord.MessageEmbed()
    .setTitle('Example')
    .setURL('https://www.google.com')
    .setAuthor(message.author.username)
    .setImage(logo)
    .setThumbnail(logo)
    .setFooter('a footer',logo)
    .setColor('#00aaFF')
    .addFields({
      name:'field uno',
      value:'uno',
      inline:true
    },
    {
      name:'field dos',
      value:'uno',
      inline:true
    },
    {
      name:'field tres',
      value:'uno',
      inline:true
    },
    {
      name:'field quadro',
      value:'quadro',
    }
    )

    message.channel.send(embed)
  })

});

client.login(config.token);
