const express = require('express')
const router = express.Router()

const fetchuserinfo = require('../middleware/fetchuserinfo')
// const Userinfomodel=require("../models/cartinfo")
const User = require('../models/Usermodel')

const { body, validationResult } = require('express-validator')


//route:3 -> Get user details using pOST:"/api/account/getuserinfo"..login required
router.get('/getuserinfo', fetchuserinfo,
    async (req, res) => {
        try {
            const userid = req.id2;
            const user = await User.findById(userid).select("-password")
            res.json(user)

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Internal server error");
        }
    }
)
router.put('/editinfo', fetchuserinfo,[
 body('name').isLength({ min: 3 }).withMessage('Enter a valid name'),
 body('mobileno').isMobilePhone().withMessage('Enter a valid mobile number'),
],async (req, res) => {
    try {
        const userid = req.id2;
        let user = await User.findById(userid).select("-password")
        if (!user) {
            return res.status(404).send("User Not Found")
        }
        // const { name, email, address, gender, mobileno, city, state, zip, _id } = req.body;
        // const newuser = {};
        // if (name) { newuser.name = name };
        const newuser = {};
        for (const key in req.body) {
            if (req.body.hasOwnProperty(key) ) {
                newuser[key] = req.body[key];
            }
        }
        user=await User.findByIdAndUpdate(userid,{$set:newuser},{new:true});//if new note then 
        res.json(user)

    } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
    }
})


module.exports = router