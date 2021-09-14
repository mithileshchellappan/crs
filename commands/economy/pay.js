const economy = require('../../economy')

module.exports = {
    commands: ['pay','give'],
    minArgs:2,
    maxArgs:2,
    expectedArgs: "<Target user @> <amt of coins>",
    callback:async (message,arguments,text)=>{
        const {guild,member} = message
        const target = message.mentions.users.first()
        if(!target) return message.reply('Please specify someone to give coins to')
        const coinsToGive = arguments[1]
        if(isNaN(coinsToGive)) return message.reply('Please provide valid number of coins')

        const coinsOwned = await economy.getCoins(guild.id,member.id)
        if(coinsOwned<coinsToGive) return message.reply(`Your balance (${coinsOwned}) is low`)

        const remainingCoins = await economy.addCoins(guild.id,member.id,coinsToGive*-1)
        const newBalance = await economy.addCoins(guild.id,target.id,coinsToGive)

        message.reply(`You have given <@${target.id}> **${coinsToGive}** coins. They now have *${newBalance}*. Your balance - *${remainingCoins}*`)

    }
}