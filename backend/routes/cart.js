const express = require('express')
const router = express.Router()

const fetchuserinfo = require('../middleware/fetchuserinfo')
// const Userinfomodel=require("../models/cartinfo")
const User = require('../models/Usermodel')
const itemmodel = require('../models/cartinfo.js')

const { body, validationResult } = require('express-validator')

//fetching cart details

router.get("/", fetchuserinfo, async (req, res) => {
    try {
        const items = await itemmodel.find({ user: req.id2 })
        res.json(items)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})
//adding item to cart

router.post('/additem', fetchuserinfo, async (req, res) => {
    try {
        const { item } = req.body;
        const newitem = new itemmodel({ user: req.id2, item, noofitems: 1 });
        const saveditem = await newitem.save();
        res.json(saveditem)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }

})
router.put("/updateitem", fetchuserinfo, async (req, res) => {
    try {
        const { item, noofitems } = req.body;
        // const newItem = {};
        // if (noofitems) { newItem.noofitems = noofitems }

        const items = await itemmodel.find({ user: req.id2 });
        let founditem = items.find((ele) => ele.item.name === item.name);

        if (!founditem) {
            return res.status(401).send("Not Found");//unauthorised
        }
        founditem.noofitems = noofitems
        founditem=await founditem.save() 
        res.json({ noofitems })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})
router.delete("/deleteitem", fetchuserinfo, async (req, res) => {
    try {
        const {item}=req.body;
        const items = await itemmodel.find({ user: req.id2 });
        let founditem = items.find((ele) => ele.item.name === item.name);
        if (!founditem) {
            return res.status(404).send("Not Found")
        }
        const deletedItem = await itemmodel.findByIdAndDelete(founditem._id);
        res.json({ "Success": "Item removed",founditem});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})
router.get("/finditem", fetchuserinfo, async (req, res) => {
    try {
        const {itemName}=req.query;
        const items = await itemmodel.find({ user: req.id2 });
        const founditem = items.find((ele) => ele.item.name === atob(itemName));
        if (!founditem) {
            res.json({founditem,no:0})
        }
        else{
            res.json({founditem,no:founditem.noofitems})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }

})

module.exports = router