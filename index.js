const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

const privateMessage= require('./pvt-dm') 

client.on('ready',()=>{
    console.log('BOT READY')

    privateMessage(client,'ping','pong')

    client.users.fetch('452065156848025631').then(user=>{
        user.send('oombu')
    })

})

client.login(config.token)