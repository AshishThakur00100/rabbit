const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//@route get /api/orders/my-orders
// desc get logged-in user's orders
// @access Private

router.get("/my-orders", protect, async (req, res) => {
  try {
    // find order for the logged-in user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});
//@route get /api/orders/:id
// desc get order by id
// @access Private

router.get("/:id", protect, async (req, res) => {
  try {
    // find order for the logged-in user
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
     
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
