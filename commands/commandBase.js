const mongo = require('@util/mongo')
const commandPrefixSchema = require('@schemas/commandPrefix-schema')
const { prefix } = require('@root/config.json')
const guildPrefixes = {}


const validatePermissions = (permissions) => {
  const validPermissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ]

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}"`)
    }
  }
}

let recentCommands = []

module.exports = (client, commandOptions) => {
  let {
    commands,
    expectedArgs = '',
    permissionError = 'You do not have permission to run this command.',
    minArgs = 0,
    maxArgs = null,
    cooldown=-1,
    requiredChannel = '',
    permissions = [],
    requiredRoles = [],
    callback,
  } = commandOptions

  if (typeof commands === 'string') {
    commands = [commands]
  }

  console.log(`Registering command "${commands[0]}"`)

  if (permissions.length) {
    if (typeof permissions === 'string') {
      permissions = [permissions]
    }

    validatePermissions(permissions)
  }

  client.on('message', async(message) => {
    const { member, content, guild } = message
    const prefix = guildPrefixes[guild.id]
    for (const alias of commands) {
      const command = `${prefix}${alias.toLowerCase()}`

      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command
      ) {
        if(requiredChannel){
          if(message.channel.name!==requiredChannel) return
        }
        for (const permission of permissions) {
          if (!member.hasPermission(permission)) {
            message.reply(permissionError)
            return
          }
        }

        for (const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find(
            (roler) => roler.name === requiredRole
          )

          if (!role || !member.roles.cache.has(role.id)) {
            message.reply(
              `You must have the "${requiredRole}" role to use this command.`
            )
            return
          }
        }
        let cooldownString = `${guild.id}-${member.id}-${commands[0]}`
        if(cooldown>0 && recentCommands.includes(cooldownString)){
          return message.reply(`Wait \`${cooldown}s\` to run this command`)
        }

        const arguments = content.split(/[ ]+/)

        arguments.shift()

        if (
          arguments.length < minArgs ||
          (maxArgs !== null && arguments.length > maxArgs)
        ) {
          message.reply(
            `Incorrect syntax! Use \`${prefix}${alias} ${expectedArgs}\``
          )
          return
        }

        recentCommands.push(cooldownString)

        if(cooldown>0){
          setTimeout(()=>{

            recentCommands = recentCommands.filter((strin)=>{
              return strin !==cooldownString
            })

          },cooldown*1000)
        }

        callback(message, arguments, arguments.join(' '), client)

        return
      }
    }
  })
}

module.exports.updateCache = (guildId,newPrefix)=>{
  guildPrefixes[guildId] = newPrefix
}

module.exports.getPrefix = (guildId)=>{
  console.log(guildPrefixes[guildId])
  return guildPrefixes[guildId]
}

module.exports.loadPrefixes = async client =>{
  await mongo().then(async mongoose=>{
    try{
      for (const guild of client.guilds.cache){
        const guildId = guild[1].id
        const result = await commandPrefixSchema.findOne({_id:guildId})
        guildPrefixes[guildId]=result?.prefix||prefix
      }

      console.log(guildPrefixes)
    }finally{
      // mongoose.connection.close()
    }
  })
}