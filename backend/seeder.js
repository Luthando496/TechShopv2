import mongoose from 'mongoose';
import db from './config/db.js'
import dotenv from 'dotenv'
import colors from 'colors'
import User from './models/userModel.js'
import Product from './models/productModels.js'
import products from './data/products.js'
import users from './data/user.js'
import Order from './models/OrderModel.js'

dotenv.config()
db()

const importData = async () => {
    try {
      await Order.deleteMany();
      await Product.deleteMany();
      await User.deleteMany();
  
      const createdUsers = await User.insertMany(users);
  
      const adminUser = createdUsers[0]._id

  
      const sampleProducts = products.map((product) => {
        return { ...product, user: adminUser };
      });

      console.log(sampleProducts);
  
      await Product.insertMany(sampleProducts);
  
      console.log('Data Imported!'.green.inverse);
      process.exit();
    } catch (error) {
      console.error(`${error}`.red.inverse);
      process.exit(1);
    }
  };


const deleteData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()
        console.log('data deleted'.green.inverse('success'))
    } catch (err) {
        console.log(err)
        console.log(`${err}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    deleteData()
}else{
    importData()
}