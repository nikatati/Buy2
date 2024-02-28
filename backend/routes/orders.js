//in experss router is resposible for creating/storing/importing/exporting the API'S
const { Order } = require("../models/order"); //returning an object
const experss = require("express");
const { OrderItem, orderItem } = require("../models/order-item");
const router = experss.Router();
const mongoose = require("mongoose");

//An get command from the DB
router.get(`/`, async (req, res) => {
  const orderList = await Order.find();

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

//creating a new object in the DB
router.post("/", async (req, res) => {
  // Create OrderItems and get their IDs
  const orderItemsIds = await Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );

  const orderItemsIdsResolved = await orderItemsIds;

  // Create an overall order object
  let order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
  });

  // Save the overall order object
  order = await order.save();

  if (!order) return res.status(400).send("The order cannot be created!");

  res.send(order);
});

module.exports = router;
