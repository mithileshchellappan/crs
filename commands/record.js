const fs = require('fs')
var wavConverter = require('wav-converter')
var path = require('path')
const {prefix} = require('../config.json')
const {getPrefix} = require('./commandBase')
const createNewChunk = () => {
    const pathToFile = __dirname + `/../recordings/${Date.now()}.pcm`;
    return fs.createWriteStream(pathToFile);
};

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
        let botEmbed = {embed:{title:title,}}
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
            const botReply  = await msg.channel.send({embed:{title:'Status:Starting to record',description,color:'GREEN'}}) 
            const dispatcher = conn.play(__dirname + '/../disclaimer.mp3');
            dispatcher.on('finish', () => { console.log(`Joined ${voiceChannel.name}!\n\nREADY TO RECORD\n`); });
            title='Status:RECORDING'
            botReply.edit({embed:{title:'Status:RECORDING',description,color:'GREEN'}})
            const receiver = conn.receiver;
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
        return;
    
    const { channel: voiceChannel, connection: conn } = msg.guild.voiceStates.cache.last();
    const dispatcher = conn.play(__dirname + "/../badumtss.mp3", { volume: 0.45 });
    dispatcher.on("finish", () => {
        voiceChannel.leave();
        console.log(`\nSTOPPED RECORDING\n`);
    });
            // vc.leave()

            // var pcmData = fs.readFileSync(path.resolve('./',fileName+'.pcm'))
            // var wavData = wavConverter.encodeWav(pcmData,{
            //     numChannels:2,
            //     sampleRate:44100,
            //     byteRate:32

            // })
            // fs.writeFileSync(path.resolve('./',fileName+'.wav'),wavData)
        }

       
    }
}