const channelId = '885846926925373450'
const check = '✅'
let registered = false;

const registerEvent = client => {
    if(registered) return
    registered = true

    console.log('regstered event')

    client.on('messageReactionAdd',(reaction,user)=>{
        if(user.bot) return

        console.log('handling reactions')
        const {message} = reaction

        if(message.channel.id === channelId) {message.delete()}
    })
}

module.exports = {
    commands:['ticket','support'],
    minArgs:1,
    expectedArgs: '<message>',
    callback:async (userMessage,arguments,text,client)=>{
        const {guild,member} = userMessage
        const channel = await client.channels.cache.get(channelId)

        channel.send(`A new ticket has been created by <@${member.id}> \n\n \`${text}\`\n \n Click the ${check} when issue is resolved`)
        .then(ticketMessage=>{ticketMessage.react(check)
        
            userMessage.reply('Ticket has been created and sent.')
            registerEvent(client)
        })
    }
}