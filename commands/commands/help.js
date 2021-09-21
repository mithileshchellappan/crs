const loadCommands = require('@root/commands/load-commands')
const {prefix} = require('@root/config.json')

module.exports = {
    commands:['help','h'],
    description:"Describes all of this bot's commands",
    callback:(message,arguments,text)=>{
        let reply = 'I am CRS bot, here are my supported commands: \n\n'

        const commands = loadCommands()

        for(const command of commands){
            let permissions = command.permissions

            if(permissions){
                let hasPermission = true
                if(typeof permissions === 'string'){
                    permissions = [permissions]

                }
                for(const permission of permissions){
                    if(!message.member.hasPermission(permission)){
                        hasPermission = false
                        break
                    }
                }

                if(!hasPermission){
                    continue
                }
            }

            const mainCommand = typeof command.commands ==='string'
                ?command.commands
                :command.commands[0]
            const args = command.expectedArgs ?` ${command.expectedArgs}`:''
            const {description} = command

            reply  += `**${mainCommand}${args}** - \`${description}\`\n`

        }

        message.channel.send(reply)
    }
}