const Commando = require("discord.js-commando");
const { restartPhrase, token } = require("@root/config.json");
module.exports = class RestartCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "restart",
      minArgs: 1,
      maxArgs: 1,
      ownerOnly: true,
      group:'moderation',
      memberName: "restart",
      description:'Restarts bor'

    });
  }

  run(message, args) {
    if (args === restartPhrase) {
      message.channel
        .send("Restarting")
        .then((msg) => this.client.destroy())
        .then(() => this.client.login(token));
    }
  }
};
