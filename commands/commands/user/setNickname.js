module.exports = {
    commands:['setname','setnickname'],
    minArgs:2,
    permissions:'ADMINISTRATOR',
    expectedArgs:'<User @> <nickname>',
    callback:(message,arguments)=>{
        const targetUser = message.mentions.users.first()

        if(!targetUser) return message.reply('You need to specify a user')
        const {guild}=message

        const member = guild.members.cache.get(targetUser.id) 

        arguments.shift()
        const nickname = arguments.join(' ')
        console.log(nickname)
        if(nickname === 'remove') {
           member.setNickname('')
           return message.react('👍')
        }
        member.setNickname(nickname)

        message.reply({embed:{
            description:`\`${targetUser.username}#${targetUser.discriminator}\` is now \`${nickname}\``,
            color:'GREEN',
            footer:"To remove nickname reply with user's @ and remove"
        }})
        
    }
}