module.exports = {
  commands: ["toss", "flip", "coinflip"],
  minArgs: 0,
  callback: (message, client) => {
    message.channel
      .send({
        embed: {
          color: "RED",
          title: ":coin:",
          description: "Spinning"
        }
      })
      .then((message) => {
          console.log(Math.floor(Math.random()* 2))
        setTimeout(() => {
          message.edit({
            embed: {
              color: "GREEN",
              title: ` \`${
                Math.floor(Math.random()* 2)  === 1 ? "Head" : "Tail"
              }\``
            }
          });
        }, 1000);
      });
  }
};
