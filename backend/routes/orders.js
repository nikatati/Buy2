//in experss router is resposible for creating/storing/importing/exporting the API'S
const { Order } = require('../models/order');  //returning an object
const experss = require('express');
const router=experss.Router();

//An get command from the DB
router.get(`/`,async (req,res)=>{
    const orderList = await Order.find();

    if(!orderList){
        res.status(500).json({success:false});
    }
    res.send(orderList);
})


module.exports=router;