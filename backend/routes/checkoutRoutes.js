const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// @route post /api/checkout
// @desc Create a new checkout session
// @access Private
router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;
  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }
  try {
    // create a new checkout session
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentMethod,
      paymentStatus: "Pending",
      isPaid: false,
    });
    console.log(`Checkout created for user ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error creating checkout:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// @route put /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private

router.put("/:id/pay", protect, async (req, res) => {
  const {  paymentStatus, paymentDetails} = req.body;
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();
      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Payment not successful" });
    }
  } catch (error) {
    console.error("Error updating checkout:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route post /api/checkout/:id/finalize
// @desc Finalize the checkout and create an order
// @access Private
router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
   if(checkout.isPaid && !checkout.isFinalized) {
    // create final order from the checkout session
     const finalOrder = await Order.create({
      user: checkout.user,
      orderItems: checkout.checkoutItems,
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: checkout.paidAt,
      isDelivered: false,
      paymentStatus:"paid",
      paymentDetails: checkout.paymentDetails,
     });
      // update the checkout session to mark it as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();
      // remove the items from the cart
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "Checkout already finalized" });
    }
    else {
      res.status(400).json({ message: "Checkout not paid" });
    }
  } catch (error) {
    console.error("Error finalizing checkout:", error);
    res.status(500).json({ message: "Server error" });
  }
}
);
module.exports = router;