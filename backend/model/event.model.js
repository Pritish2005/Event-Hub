const mongoose=require("mongoose")

const EventSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    date:{type:Date,required:true},
    location:{type:String,required:true},
    host:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    maxLimit:{type:Number},
},{
    timestamps:true
})

module.exports=mongoose.model("Event",EventSchema)