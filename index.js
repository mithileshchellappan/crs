const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const command = require("./commands");

const mongo = require('./mongo')
const sendMessage = require('./send-message')
client.on("ready", async () => {
  console.log("BOT READY");
  await mongo().then(mongoose=>{
    try{
      console.log('mongodb connected')
    }
    finally{
      mongoose.connection.close()
    }
  })
});

client.login(config.token);
