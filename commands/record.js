const fs = require('fs')
var wavConverter = require('wav-converter')
var path = require('path')
const {prefix} = require('../config.json')
module.exports = {
    commands:['record','rec','recvc'],
    minArgs:1,
    maxArgs:1,
    permissions:['MUTE_MEMBERS','ADMINISTRATOR'],
    expectedArgs:'<start> or <stop>',
    description:'Records user audio in a vc',
    callback:async (message,arguments,text,client)=>{
        const vc = message.member.voice.channel
        const botvc = message.guild.me.voice.channel
        const fileName = `./recordings/${message.author.username}-rec`
        if(!vc) 
            return message.channel.send({embed:{title:'You have to be in a vc to use this'}});
        if(botvc && vc !== botvc) return message.channel.send(`You have to be in <#${botvc.id}> to use this command `)

        if(arguments[0] == 'start'){
            const connection = await vc.join()
            message.channel.send({embed:{title:'Started Recording!',description:`To stop recording send \`${prefix}record stop\` `}})
            connection.play(path.join('./','./disclaimer.mp3'))
            const streams = vc.members.map((u,index) => {
                console.log('user:'+ u)
                receiver = connection.receiver.createStream(u, { mode: 'pcm', end: 'manual' })
            
            receiver.pipe(fs.createWriteStream(`./recordings/${index.toString()}`+'.pcm'))
            
        });
        // const receiver = connection.receiver.createStream(message.member,{
        //     mode:"pcm",
        //     end:"manual"
        // })
        // receiver.pipe(fs.createWriteStream(fileName+'.pcm'))
        
        // console.log(streams)

    }

        if(arguments[0] == 'stop'){
            vc.leave()

            var pcmData = fs.readFileSync(path.resolve('./',fileName+'.pcm'))
            var wavData = wavConverter.encodeWav(pcmData,{
                numChannels:2,
                sampleRate:44100,
                byteRate:32

            })
            fs.writeFileSync(path.resolve('./',fileName+'.wav'),wavData)
        }

       
    }
}