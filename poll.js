module.exports = (client) => {
  const channelIds = ["884691022184083455"];

  const addReactions = (wow) => {
    wow.react("👍");
    setTimeout(() => {
      wow.react("👎");
    },750);
    
}
    client.on('message',async(message)=>{
        if(channelIds.includes(message.channel.id)){
            addReactions(message);
        }else if(message.content.toLowerCase() === "!poll"){
            await message.delete();

            const fetched = await message.channel.messages.fetch({limit: 1});

            if(fetched && fetched.first()){
                addReactions(fetched.first())
            }
        }
    })
};
