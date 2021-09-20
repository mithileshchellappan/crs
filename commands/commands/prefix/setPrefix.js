const mongo = require('@util/mongo')
const commandPrefixSchema = require('@schemas/commandPrefix-schema')
const {updateCache} = require('@root/commands/commandBase')
module.exports = {
    commands:'setprefix',
    minArgs:1,
    maxArgs:1,
    expectedArgs:'<prefix>',
    permissionError:'You must be an admin to run this command.',
    permissions:'ADMINISTRATOR',
    callback:async (message,arguments,text)=>{
        await mongo().then(async mongoose=>{
            try{
                const guildId = message.guild.id
                await commandPrefixSchema.findOneAndUpdate({
                    _id:guildId
                },{
                    _id:guildId,
                    prefix:arguments[0]
                },{
                    upsert:true
                })
                updateCache(guildId,arguments)
                message.reply(`Prefix for the bot is now ${arguments[0]}`)
            }finally{
                // mongoose.connection.close()
            }
        })
    }   
}