const command = require('./commands')

const ownerId = ''
const channelId = ''

module.exports = client => {
    command(client,'eval',message=>{
        const {member,channel,content} = message
        if(member.id === ownerId && channel.id === channelId){
            try{
                const result = eval(content.replace('!eval',''))
                channel.send(result)
            }catch(e){
                channel.send('```'+e+'```')
            }
            
        }
    })
}