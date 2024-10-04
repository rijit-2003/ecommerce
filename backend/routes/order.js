const express = require('express')
const router = express.Router()

const fetchuserinfo = require('../middleware/fetchuserinfo')
// const Userinfomodel=require("../models/cartinfo")
const User = require('../models/Usermodel')
const ordermodel = require('../models/orderinfo')

const { body, validationResult } = require('express-validator')

//fetching cart details

router.get("/", fetchuserinfo, async (req, res) => {
    try {
        const items = await ordermodel.find({ user: req.id2 })
        res.json(items)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})
//ordered item
router.post('/addorder', fetchuserinfo, async (req, res) => {
    try {
        const { item,noofitems} = req.body;
        const newitem = new ordermodel({ user: req.id2, item, noofitems: noofitems });
        const saveditem = await newitem.save();
        res.json(saveditem)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }

})
//cancelling any item
router.delete("/cancelorder", fetchuserinfo, async (req, res) => {
    try {
        const {item}=req.body;
        const items = await ordermodel.find({ user: req.id2 });
        let founditem = items.find((ele) => ele.item.name === item.name);
        if (!founditem) {
            return res.status(404).send("Not Found")
        }
        founditem.orderstatus='Cancelled';
        await founditem.save(); 
        res.json({founditem});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})


module.exports = router