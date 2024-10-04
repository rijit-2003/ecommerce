
const mongoose=require("mongoose")
const mongoURI="mongodb://127.0.0.1:27017/ecommerce"

const connectToMongo=()=>{
    mongoose.connect(mongoURI).then(()=>{console.log("Connection successful")}).catch((err)=>{console.log("Connection unsuccessful!")})
}

module.exports=connectToMongo