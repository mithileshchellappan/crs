module.exports = {
  commands: "invites",
  description:'Tracks invites of a server',
  callback: (message) => {
    const { guild } = message;
    guild.fetchInvites().then((invites) => {
      const inviteCounter = {
      };

      invites.forEach((invite) => {
        const { uses, inviter } = invite;
        const { username, discriminator } = inviter;

        const name = `${username}#${discriminator}`;

        inviteCounter[name] = (inviteCounter[name] || 0) + uses;

        console.log(inviteCounter[name]);
      });
      let replyText = "\nInvites:\n";

      const sortedInvites = Object.keys(inviteCounter).sort(
        (a, b) => inviteCounter[b] - inviteCounter[a]
      );
      console.log(sortedInvites);

        sortedInvites.length = 3

      for (const invite of sortedInvites) {
        const count = inviteCounter[invite];
        replyText += `\`${invite} has invited ${count} member(s)\`\n`;
      }

      message.reply(replyText);
    });
  }
};
