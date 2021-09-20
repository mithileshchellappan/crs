
module.exports = {
    commands:['giverole','addrole'],
    minArgs:2,
    expectedArgs:"<User @><role name>",
    permissions:'ADMINISTRATOR',
    callback:(message,arguments)=>{
        const targetUser = message.mentions.users.first()
        if(!targetUser) return message.reply("You need to specify someone to give role")

        arguments.shift()
        const roleName = arguments.join(' ')
        const {guild}=message
        
        const role = guild.roles.cache.find((findRole)=>{return findRole.name===roleName})

        if(!role) return message.reply('Role does not exist!')
        
        const member = guild.members.cache.get(targetUser.id) 
        member.roles.add(role)

        return message.reply(`\`${targetUser.username}#${targetUser.discriminator}\` now has \`${role.name}\` role`)
        
    }
}