const mongoose=require('mongoose')
const {Schema}=mongoose;

const orderinfoschema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    item:{
        type:Object
    },
    date: {
        type: Date,
        default: Date.now
    },
    noofitems:{
        type:Number,
        default:1,
    },
    orderstatus:{
        type:String,
        enum:['Placed','Cancelled'],
        default:'Placed'
    }
    
});
const ordermodel=mongoose.model('order',orderinfoschema)
module.exports=ordermodel;