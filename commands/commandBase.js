const { prefix } = require('../config.json');

const validatePermissions = (permissions) => {
  const validatePermissions = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS"
  ];

  for (const permission of permissions) {
    if (!validatePermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}""`);
    }
  }
};

const allCommands = {

}

module.exports = (commandOptions) => {
  let {
    commands,
    permissions = [],
  } = commandOptions;

  if (typeof commands === "string") {
    commands = [commands];
  }

  console.log('\x1b[33m%s\x1b[0m',"Registering command "+`${commands}`)

  if (permissions.length) {
    if (typeof permissions === "string") {
      permissions = [permissions];
    }
    validatePermissions(permissions);
  }

  for(const command of commands){
    allCommands[command] = {
      ...commandOptions,
      commands,
      permissions
    }
  }
};

module.exports.listen = (client)=>{
  client.on("message", (message) => {
    const { member, content, guild } = message;
    const arguments = content.split(/[ ]+/)
    const name = arguments.shift().toLowerCase()

    if(name.startsWith(prefix)){
      const command = allCommands[name.replace(prefix,'')]
      if(!command){
        return
      }
      
      const 
      {
        permissions,
        permissionError="`You do not have permission to run this command`",
        requiredRoles=[],
        minArgs = 0,
        maxArgs = null,
        expectedArgs,
        callback
      } = command

    for(const permission of permissions){
      if(!member.hasPermission(permission)){
          message.reply(permissionError)
          return
      }
  }

  for(const requiredRole of requiredRoles){
      const role = guild.roles.cache.find(role=>role.name === requiredRole)

      if(!role || member.roles.cache.has(role.id)){
          message.reply(`You must have \`${requiredRole}\` to use this command`)
          return
      }
  }



  if(arguments.length<minArgs|| (maxArgs !== null && arguments.length > maxArgs )){
      message.reply(`Incorrect syntax! Use \`${prefix}${alias} ${expectedArgs}\` `)
      return
  }

  callback(message,arguments,arguments.join(' '))
    }

    

  
  });
}
