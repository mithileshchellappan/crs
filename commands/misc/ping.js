module.exports = {
    commands:'ping',
    minArgs:0,
    maxArgs:0,
    description:'Server active test',
    callback:(message,arguments,text,client)=>{
        message.reply('Calculating..').then(resultMess =>{
            const ping = resultMess.createdTimestamp - message.createdTimestamp
            resultMess.edit('',{
                embed:{
                    description:`Ping:\`${ping}ms\` \n API Latency: \`${client.ws.ping}ms\``,
                    color:'RED'
                }
            })
        })
    },
}