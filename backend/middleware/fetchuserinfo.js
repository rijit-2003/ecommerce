require('dotenv').config();
var jwt=require('jsonwebtoken');

var JWT_SECRET="BghvAGC5462HHDJKNDKJkndckjbdchyuewvdhwweoidhwegCf527w012ndklwmdixwh";

const fetchuserinfo=(req,res,next)=>{
    //get the user from jwt token and add id to req
    const token=req.header('auth-token');//after login/sign up auth-token is stored in header of request
    if(!token){//if no toke stored---not authenticated
        return res.status(400).send({error:"Please authenticate using valid token"})
    }
    try{
        /*he function verifies the token's authenticity by checking its signature against the provided secret key JWT_SECRET used during creation
        If the signature is valid, it proceeds to decode the information stored within the token. */
        const data=jwt.verify(token,JWT_SECRET)
        req.id2=data.user.id
        console.log(data)
        next()
    }catch(err){
        res.status(500).send({error:"Please authenticate using valid token"})
    }
}

module.exports=fetchuserinfo;