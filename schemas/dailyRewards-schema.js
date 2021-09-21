const mongoose = require('mongoose')

const req = {
    type:String,
    required:true
}

const dailyRewardsSchema = mongoose.Schema({
    guildId:req,
    userId:req
},{
    timestamps:true
})

module.exports = mongoose.model('daily-rewards',dailyRewardsSchema)