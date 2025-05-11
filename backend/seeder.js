const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); 
const User = require('./models/User');
const Cart = require('./models/Cart');
const products = require('./data/products');

dotenv.config();

// here at first we will connect to the database
mongoose.connect(process.env.MONGO_URI);

// here at first i will seed the database with some data
// and then i will create a function to seed the database

const seedData = async () => {
  try {
    //Every time i run this , i will  Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // Create a default admin user
    const createdUser = await User.create({
      name: 'Admin User',
      email: "admin@example.com",
      password: "123456",
      role: 'admin',
    });
   // Assigning the default  user ID to the products
   const userID = createdUser._id;
    // Create products with the default user ID
    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });
    // Insert products into the database
    await Product.insertMany(sampleProducts);
    console.log('Data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Call the seedData function to start the seeding process
seedData();