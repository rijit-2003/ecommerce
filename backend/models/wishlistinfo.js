const mongoose=require('mongoose')
const {Schema}=mongoose;

const wishlistinfoschema=new Schema({
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
});
const wishlistmodel=mongoose.model('wishlist',wishlistinfoschema)
module.exports=wishlistmodel;