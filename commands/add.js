module.exports = {
    commands:['add','addition'],
    expectedArgs:'<num1> <num2>',
    permissionError:'You need admin permissions to run this command',
    minArgs:2,
    maxArgs:2,
    callback:(message,arguments,text)=>{
        message.channel.send(`${+arguments[0] + +arguments[1]}`)
    },
    permissions:['ADMINISTRATOR'],
    requiredRoles:[],
}