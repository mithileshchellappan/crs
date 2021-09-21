const Commando = require('discord.js-commando')
const mongo = require('@util/mongo')
const dailyRewardsSchema = require('@schemas/dailyRewards-schema')

let claimedCache = []

const clearCache = () =>{
    claimedCache=[]
    setTimeout(clearCache,1000*60*10)
}
clearCache()

module.exports = class DailyCommand extends Commando.Command{
    constructor(client){
        super(client,{
            name:'daily',
            group:'economy',
            memberName:'daily',
            description:'Claims daily rewards'
        })
    }

    async run(message){
        const {guild,member} = message
        const {id} = member

        if(claimedCache.includes(id)){
            console.log('return from cache')
            return message.reply('You have already claimed your daily rewards')
        }

        console.log('from mongo')

        const obj = {
            guildId:guild.id,
            userId:id
        }

        await mongo().then(async mongoose =>{
            try{
                const results = await dailyRewardsSchema.findOne(obj)
                console.log(results)
                if(results){
                    const then = new Date(results.updatedAt).getTime()
                    const now = new Date().getTime()

                    const diffTime = Math.abs(now-then)
                    const diffDays = Math.round(diffTime/(1000*60*60*24))

                    if(diffDays<=1){
                        claimedCache.push(id)
                        return message.reply('You have already claimed your daily rewards')
                    }
                }

                await dailyRewardsSchema.findOneAndUpdate(obj,obj,{
                    upsert:true
                })

                claimedCache.push(id)
                //TODO:Give reward.
                message.reply('You have claimed your daily rewards')
            }finally{}
        })
    }

}
