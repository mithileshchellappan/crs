module.exports = {
    commands : ['deletechannel','delchannel'],
    maxArgs:0,
    permissions:'ADMINISTRATOR',
    permissionError:'You are not a admin',
    description:'Purges a channel',
    callback:(message,arguments,text)=>{
        message.channel.delete()
    }
}