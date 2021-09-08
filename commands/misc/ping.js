module.exports = {
    commands:'ping',
    expectedArgs:'<num1> <num2>',
    minArgs:0,
    maxArgs:0,
    callback:(message,arguments,text)=>{
        message.reply('pong')
    },
}