const channels = ['887216856262406214']

module.exports = client =>{ 
    client.on('message',message=>{
        const {content} = message
        const eachLine = content.split('\n')

        for(const line of eachLine){
            if(line.includes('=')){
                const split = line.split('=')
                const emoji = split[0].trim()
                message.react(emoji)
            }
        }
    })
}