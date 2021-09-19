const mongo = require('../../mongo.js');
const warnSchema = require('../../schemas/warn-schema.js');

module.exports = {
    commands:'warn',
    minArgs:2,
    expectedArgs:"<User @> <Reason>",
    requiredRoles:['Moderator'],
    callback:async(message,arguments)=>{
        const target = message.mentions.users.first()
        if(!target) return message.reply('Please specify someone to warn')

        arguments.shift()

        const guildId = message.guild.id
        const userId =target.id
        const reason = arguments.join(' ')

        const warning = {
            author:message.member.user.tag,
            timestamp:new Date(),
            reason
        }
        await mongo().then(async mongoose=>{
            try{
                await warnSchema.findOneAndUpdate({
                    guildId,
                    userId
                },{
                    guildId,userId,
                    $push:{warning:warning}
                },{
                    upsert:true
                })
                console.log('updated')
            }finally{
            }
        })

    }
}