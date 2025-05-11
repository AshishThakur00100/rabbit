const mongoose = require("mongoose");
const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: String,
    image: String,
    price: String,
    size: String,
    color: String,
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { _id: false } // Disable automatic _id generation for subdocuments
);
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestId: {
      type: String,
    },
    products: [cartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Cart", cartSchema);
// this is the cart model which will be used to store the cart items for the user and guest users. it will also store the total price of the cart items. it will also store the user id and guest id. it will also store the product id, name, image, price, size, color and quantity of the product.