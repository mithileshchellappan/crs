const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

const command = require('./commands')

client.on('ready',()=>{
    console.log('BOT READY')

    command(client,['ping','test'],message =>{
        message.channel.send('pong')
    })
})

client.login(config.token)