const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const firstMessage = require('./first-message')

const firstMess = require('./first-message')

client.on('ready',()=>{
    console.log('BOT READY')
    firstMessage(client,'883399848026599464','helloworld!!',['🔥','💔','🍕'])
})

client.login(config.token)