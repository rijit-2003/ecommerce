
require('dotenv').config();
const express=require('express')
const {body,validationResult} =require('express-validator')
const fetchuserinfo=require('../middleware/fetchuserinfo')
const bcrypt = require('bcryptjs')
var jwt=require('jsonwebtoken')
const User = require('../models/Usermodel')
var JWT_SECRET="BghvAGC5462HHDJKNDKJkndckjbdchyuewvdhwweoidhwegCf527w012ndklwmdixwh";


const router=express.Router()
//Route1:create a endpoint using:POST "/api/auth/createuser".doesnt reuire auth
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must contain atlest 5 characters').isLength({min:5}),
    ],async(req,res)=>{
        let success=false;
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        try{
            //if email already exists
            let user=await User.findOne({email:req.body.email});
            if(user){
                return res.status(400).json({error:"A user already exists with this email"})
            }
            //password protection by salt
            const salt=await bcrypt.genSalt(15);
            const secpassword=await bcrypt.hash(req.body.password,salt);
            //creating user using secpassword
            user= await User.create({
                name:req.body.name,
                email:req.body.email,
                password:secpassword,
                mobileno:"",
                gender:null,
                address:"",
                city:"",
                state:"Choose...",
                zip:"",
            })
            const data={
                user:{
                    id:user.id
                }
            }
            success=true;
            const authToken=jwt.sign(data,JWT_SECRET);
            res.json(({success,authToken}))
        }
        catch(err){
            console.log(err.message);
            res.status(500).send("Internal Server Error!");
        }
})

//Route2:create a endpoint using:POST "/api/auth/login"
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be empty').exists(),
],async(req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(408).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try{
        let user=await User.findOne({email});
        let newuser=false;
        if(!user){
            newuser=true;
            return res.json({success,newuser});
        }
        /*bcrypt.compare() function take into account the salt that was used during the hashing process.
         It internally handles the salt extraction and comparison.*/
        const passwordcomp=await bcrypt.compare(password,user.password);
        if(!passwordcomp){
            return res.status(400).json({success,error:"Please enter correct credentials"})
        }
        const data={
            user:{
                id:user.id
            }
        }
        
        const authtoken=jwt.sign(data,JWT_SECRET);
        success=true;
        const name=user.name;
        res.json({success,authtoken,newuser,name})

    }catch(err){
        console.log(err.message)
        res.status(500).send("Internal Server Error");
    }

})


module.exports=router