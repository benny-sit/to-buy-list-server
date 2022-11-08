const express = require('express');
const List = require("../modules/List.js");
const ListItem = require("../modules/ListItem.js");
const {getList, saveSender} = require("../modules/ListActions.js");

const router = express.Router();

//  Before All routes -
router.use(getList);


// Routes ----------------------------------------------------------------
router.post('/', async function(req, res, next) {
    
    if( !(req.body.itemName && req.body.quantity)) {
        return res.status(400).json({error: "Required fields not provided"});
    }

    if (res.list.items !== undefined) { 
        res.list.items.push(new ListItem({name: req.body.itemName, qty: req.body?.quantity}))
    } else {
        const item = new ListItem({name: req.body.itemName, qty: req.body?.quantity })
        console.log(item)
        console.log(req.body.itemName);
        res.list.items = [item]
    }
    res.statusSuccess = 201
    res.message = 'List item created successfully'
    next()
});

router.delete('/', function(req, res, next) {
    const id = req.body.id
    if (id) {
        const doc = res.list.items.id(id);
        if (doc) {
            doc.remove();
        } else {
            return res.status(404).json({error: "Item not found"})
        }
    } else {
        return res.status(400).json({error: "Need id of item to delete"})
    }

    res.statusSuccess = 200
    res.message = 'List item deleted'
    next()
});

router.put('/', function(req, res, next) {
    const id = req.body.id;
    let doc;
    if (id) {
        doc = res.list.items.id(id)
        console.log(doc);
        if (doc) {
            doc.name = req.body.itemName ? req.body.itemName : doc.name;
            doc.qty = req.body.quantity ? req.body.quantity : doc.qty;
            doc.updated()
        }  else {
            return res.status(404).json({error: "Item not found"});
        }
    } else {
        return res.status(400).json({error: "Need id of item to change"})
    }

    res.statusSuccess = 200
    res.message = 'List item changed successfully'
    next()
});

router.delete('/clear', async function(req, res, next) {
    res.list.items = [];

    res.statusSuccess = 200
    res.message = 'List cleared successfully'
    next()
});


// Sender After all routes ----------------------------------------------------------------
router.use(saveSender)

module.exports = router;