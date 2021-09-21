const Commando = require('discord.js-commando')

module.exports = class StartGiveawayCommand extends Commando.Command{
    constructor(client){
        super(client,{
            name:'startgiveaway',
            group:'giveaway',
            memberName:'startgiveaway',
            description:'Starts a giveaway',
            userPermissions:['ADMINISTRATOR']
        })
    }

    async run(message,args){
        message.delete().then(()=>{
            const {guild,channel} = message

            channel.messages.fetch({limit:1}).then(messages=>{
                message = messages.first()

                if(!message) return channel.send('There are no messages')
                if(!args) return channel.send('Please provide a emoji to react to.')
                message.react(args)
            })


        })
    }
}