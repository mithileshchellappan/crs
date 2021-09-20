const mongoose = require('mongoose')

const {mongoPath} = require('@root/config.json')

// const {cloudMongoPath : mongoPath} = require('./config.json')

module.exports=async()=>{
    await mongoose.connect(mongoPath,{
        useNewUrlParser:true
    })
    return mongoose 
}