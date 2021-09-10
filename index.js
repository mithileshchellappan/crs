const path = require("path");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client({
  ws: { properties: { $browser: "Discord Android" } },
});
const config = require("./config.json");

const inviteNotifications = require("./inviteNotification");

client.on("ready", async () => {
  console.log("BOT READY!");
  const baseFile = "commandBase.js";
  const commandBase = require(`./commands/${baseFile}`);

  inviteNotifications(client);
  // const match = /^```(\S*)\n?([^]*)\n?```$/.exec(message.content)

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        if (file !== "dist") {
          readCommands(path.join(dir, file));
        }
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file));
        commandBase(option);
      }
    }
  };

  readCommands("commands");

  commandBase.listen(client);
});

client.login(config.token);
