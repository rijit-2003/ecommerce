const express = require('express')
const router = express.Router()

const fetchuserinfo = require('../middleware/fetchuserinfo')
// const Userinfomodel=require("../models/cartinfo")
const wishlistmodel = require('../models/wishlistinfo')

const { body, validationResult } = require('express-validator')


router.get("/", fetchuserinfo, async (req, res) => {
    try {
        const items = await wishlistmodel.find({ user: req.id2 })
        res.json(items)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})
//adding item to cart

router.post('/addwishitem', fetchuserinfo, async (req, res) => {
    try {
        const { item } = req.body;
        const newitem = new wishlistmodel({ user: req.id2, item});
        const saveditem = await newitem.save();
        res.json(saveditem)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }

})
router.delete("/deletewishitem", fetchuserinfo, async (req, res) => {
    try {
        const {item}=req.body;
        const items = await wishlistmodel.find({ user: req.id2 });
        let founditem = items.find((ele) => ele.item.name === item.name);
        if (!founditem) {
            return res.status(404).send("Not Found")
        }
        const deletedItem = await wishlistmodel.findByIdAndDelete(founditem._id);
        res.json({ "Success": "Item removed",founditem});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})
router.get("/findwishitem", fetchuserinfo, async (req, res) => {
    try {
        const {itemName}=req.query;
        const items = await wishlistmodel.find({ user: req.id2 });
        const founditem = items.find((ele) => ele.item.name === atob(itemName));
        if (!founditem) {
            res.json({founditem})
        }
        else{
            res.json({founditem})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }

})

module.exports = router