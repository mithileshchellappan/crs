module.exports = {
    commands: ['whois', 'userinfo', 'about'],
    description:'Shows userinfo of a mentioned user',
    
    callback: async (message, args, client) => {
        console.log(args)
        const member = message.mentions.members.first() || message.guild.member(args[0])  ,
            date = new Date(), joinedDate = new Date(member.joinedTimestamp), createdDate = new Date(member.user.createdTimestamp);

        const yearsOld = date.getFullYear() - createdDate.getFullYear(), daysOld = Math.round((date.getTime() - createdDate.getTime()) / (1000 * 3600 * 24));
        const joinedSince = Math.round((date.getTime() - joinedDate.getTime()) / (1000 * 3600 * 24));

        let permissionRole = '';

        const getPermission = () => {

            if (message.guild.ownerID === member.user.id)
                return permissionRole = 'Server Owner';

                if (member.hasPermission("ADMINISTRATOR"))
                    return  permissionRole = "Administrator";

                if (member.hasPermission("BAN_MEMBERS") || member.hasPermission("KICK_MEMBERS"))
                    return permissionRole = "Moderator";

                 if (member.hasPermission('MANAGE_MESSAGES'))
                    return permissionRole = "Helper";

                else
                    return permissionRole =  "Member";
        }

        const status = () => {
            switch(member.user.presence.status) {
                case "online":
                    return "🟢 Online";
                case "idle":
                    return "🌒 Idle";
                case "dnd":
                    return "🔴 Do Not Disturb";
                case "offline":
                    return "👤 Offline";
                default:
                    return "No Status Found.";
            }
        }
    
        
        // you will be able to just type a members name like: ;whois LioFires and it will display my information. This is not casesentive 
        function getUser() {
            console.log('argsa',arguments)
            const searchMember = arguments.join(" ");
            const getMember = message.guild.members.cache;

            const cachedMember = getMember.find(member => member.displayName.toLowerCase() === searchMember.toLowerCase()) || getMember.find(member => member.user.username.toLowerCase() === searchMember.toLowerCase());

            return (cachedMember !== undefined) ? cachedMember : message.member;
        }


        const memberInfo = [
            `〘Nickname〙'${member.displayName}'`,
            ``,
            `〘Server Role〙'${getPermission()}'`,
            ``,
            // `〘Created Date〙'${client.format(createdDate, "fullDate")}'`,
            // ``,
            // `〘Joined Date〙'${client.format(joinedDate, "fullDate")}'`,
            // ``,
            `〘Joined〙'${joinedSince} Days Ago'`,
            ``,
            `〘Years Old〙${yearsOld}`,
            ``,
            `〘Days Old〙${daysOld}`,
            ``,
            `〘Bot〙${member.user.bot}`,
            ``,
            `〘Highest Role〙'${member.roles.highest.name}'`,
            ``,
            `〘Current Status〙'${status()}'`,
        ];

       await message.channel.send(
           {
               embed:{
                   color:member.displayHexColor,
                   thumbnail:member.user.displayAvatarURL({ dynamic: true, format: 'png' }),
                   author:`${member.user.tag}(s) Info`,
                   description:`\`\`\`js\n${memberInfo.join('\n')}\`\`\``,
                   footer:`Username: ${member.user.username}\nDiscriminator: ${member.user.discriminator}\nID: ${member.user.id}\n\nTime Used:  Seconds`
               }
           })
        } 
    
}