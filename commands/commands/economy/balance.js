
const economy = require('@features/economy')

module.exports={
    commands:['balance','bal'],
    maxArgs:1,
    expectedArgs:"[Target user's @]",
    description:'Shows balance of a user',

    callback:async (message)=>{
        const target = message.mentions.users.first() || message.author
        const userId = target.id

        const guildId = message.guild.id

        const coins = await economy.getCoins(guildId,userId)

        message.reply(`That user has ${coins} coins! `)
    }
}