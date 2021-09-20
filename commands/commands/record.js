const fs = require('fs')
var path = require('path')
const {prefix} = require('@root/config.json')
const {getPrefix} = require('@root/commands/commandBase')

let chunkPath; 

const createNewChunk = () => {
    const pathToFile = `${chunkPath}/${Date.now()}.pcm`;
    return fs.createWriteStream(pathToFile);
};

const createNewGuildDirectory = (message)=>{
    const guildId = message.guild.id
    const dirPath = __dirname + `/../recordings/${guildId}`
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath)
        chunkPath = dirPath
    }else{
        fs.readdir(dirPath,(err,files)=>{
            if(err) throw err

            for(const file of files){
                fs.unlink(path.join(dirPath,file),err=>{if(err)throw err})
            }
        })
        chunkPath = dirPath
    }


}

module.exports = {
    commands:['record','rec','recvc'],
    minArgs:1,
    maxArgs:1,
    permissions:['MUTE_MEMBERS','ADMINISTRATOR'],
    expectedArgs:'<start> or <stop>',
    description:'Records user audio in a vc',
    callback:async (msg,arguments,text,client)=>{
        let title = 'Status: Starting to record'
        const description=`To stop recording send \`${getPrefix(msg.guild.id)}record stop\``
        let botReply;
        const vc = msg.member.voice.channel
        const botvc = msg.guild.me.voice.channel
        if(!vc) 
            return msg.channel.send({embed:{title:'You have to be in a vc to use this'}});
        if(botvc && vc !== botvc) return msg.channel.send(`You have to be in <#${botvc.id}> to use this command `)

        if(arguments[0] == 'start'){
            console.log(vc)
            var channelName = vc.name
            channelName = channelName.toLowerCase();
    
    const voiceChannel = msg.guild.channels.cache
                            .filter(c => c.type === "voice" || c.type === "stage")
                            .find(channel => channel.name.toLowerCase() === channelName);
    
    if (!voiceChannel || (voiceChannel.type !== 'voice' && voiceChannel.type !== 'stage'))
        return msg.reply(`The channel #${channelName} doesn't exist or isn't a voice channel.`);
    
    console.log(`Sliding into ${voiceChannel.name} ...`);
    voiceChannel.join()
        .then(async conn => {
            botReply  = await msg.channel.send({embed:{title:'Status:Starting to record',description,color:'RED'}}) 
            const dispatcher = conn.play(__dirname + '/../disclaimer.mp3');
            dispatcher.on('finish', () => { console.log(`Joined ${voiceChannel.name}!\n\nREADY TO RECORD\n`); });
            botReply.edit({embed:{title:'Status:RECORDING',description,color:'GREEN'}})
            const receiver = conn.receiver;
            createNewGuildDirectory(msg)
            conn.on('speaking', (user, speaking) => {
                if (speaking) {
                    console.log(`${user.username} started speaking`);
                    const audioStream = receiver.createStream(user, { mode: 'pcm' });
                    audioStream.pipe(createNewChunk());
                    audioStream.on('end', () => { console.log(`${user.username} stopped speaking`); });
                }
            });
        })
        .catch(err => { throw err; });

    }

        if(arguments[0] == 'stop'){
            if(msg.guild.voiceStates.cache.filter(a => a.connection !== null).size !== 1)
        {return;}
    
        const { channel: voiceChannel} = msg.guild.voiceStates.cache.last();
        let botFinishReply = await msg.channel.send({embed:{title:'Finished Recording',description:'File has been recorded',color:'GREEN'}})
        voiceChannel.leave();
        console.log(`\nSTOPPED RECORDING\n`);
        const merge = require('../../features/features/audioConfig')
        merge.merge(msg.guild.id)

        
        

        }

       
    }
}