module.exports = (client) => {
  const invites = {};

  const getInviteCounts = async (guild) => {
    return await new Promise((resolve) => {
      guild.fetchInvites().then((invites) => {
        const inviteCounter = {};

        invites.forEach(invite => {
            const {uses,inviter} = invite
            const {username,discriminator} = inviter

            const name = `${username}#${discriminator}`

            inviteCounter[name] = (inviteCounter[name] || 0)  + uses
        })
        resolve(inviteCounter)
      });
    });
  };


  client.guilds.cache.forEach(async guild=>{
      invites[guild.id] = await getInviteCounts(guild)
  })

  client.on('guildMemberAdd',async member=>{
      const {guild,id} = member

      const invitesBef = invites[guild.id]
      const invitesAf = await getInviteCounts(guild)

      console.log('before',invitesBef)
      console.log('after',invitesAf)

      for(const inviter in invitesAf){
          if(invitesBef[inviter] === invitesAf[inviter]-1){
            const channelid = '883407850951540836'
            const channel = await client.channels.cache.get(channelid)
            const count = invitesAf[inviter]
            channel.send(`Hello <@${id}>. Invited by ${inviter} (${count} invites)`)

invites[guild.id] = invitesAf

            return 
          }
      }

  })
};
