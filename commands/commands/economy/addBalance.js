const economy = require('@features/economy')

module.exports = {
    commands:['add','addbal'],
    minArgs:2,
    maxArgs:2,
    expectedArgs:"<Target @> <Coin ammount>",
    permissionError:"Must be an administrator to use command",
    permissions:'ADMINISTRATOR',
    description:'Adds balance to a user',
    callback:async(message,arguments)=>{
        const mention = message.mentions.users.first()

        if(!mention) return message.reply('Tag a user to add coins')

        const coins = arguments [1]

        if(isNaN(coins)){
            return message.reply('provide valid coins')
        }

        const guildId = message.guild.id
        const userId = mention.id

        const newCoins = await economy.addCoins(guildId,userId,coins)

        message.reply(`You have given <@${userId}> ${coins} coins.They now have ${newCoins} coins`)
    }

}