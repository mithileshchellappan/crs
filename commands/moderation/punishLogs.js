const mongo = require('../../mongo')
const punishmentLogSchema = require('../../schemas/punishLog-schema')

module.exports = {
    commands:['punishlogs'],
    minArgs:1,
    maxArgs:1,
    expectedArgs:"<Target user's @>",
    cooldown:10,
    permission:'ADMINISTRATORS',
    callback:async(message,arguments)=>{
        const target = message.mentions.users.first()

        if(!target) return message.reply('Specify someone')
const {guild} = message
        const {id} = target

        await mongo().then(async mongoose=>{
            try{
                const results = await punishmentLogSchema.find({
                    guildId:guild.id,
                    userId:id
                })

                let reply = ''
                for(const result of results){
                    reply +=`${result.command} - ${new Date(result.createdAt).toLocaleDateString()} \n\n`
                }
                message.channel.send({embed:{
                    description:reply
                }})
            }finally{

            }
        })
    }
}