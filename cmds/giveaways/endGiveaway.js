const Commando = require('discord.js-commando')

module.exports = class EndGiveaway extends Commando.Command{
    constructor(client){
        super(client,{
            name:'endgiveaway',
            group:'giveaway',
            memberName:'endgiveaway',
            description:'Ends a giveaway',
            userPermissions:['ADMINISTRATOR']
        })
    }

    async run(message,args){
        message.delete().then(()=>{
            const {channel} = message

            channel.messages.fetch({limit:1}).then(async messages=>{
                message = messages.first()

                if(!message) return channel.send('There are no messages')
               
                const {users} = await message.reactions.cache.first().fetch()

                const reactionUsers = await users.fetch()

                let possibleWinners = reactionUsers.array().filter(user=>user.bot!==true)
                
                console.log(possibleWinners)
                const winner = possibleWinners[Math.floor(Math.random()*possibleWinners.length)]

                console.log(winner)

            })


        })
    }
}