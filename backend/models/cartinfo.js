const mongoose=require('mongoose')
const {Schema}=mongoose;

const cartinfoschema=new Schema({
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
    }
    
});
const cartmodel=mongoose.model('cart',cartinfoschema)
module.exports=cartmodel;