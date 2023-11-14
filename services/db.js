//Mongodb connection with js

//1)connection library - mongoos
// install mongoos - npm i mongoose 

//2) Import mongoose

const mongoose = require('mongoose')

//3) define string

mongoose.connect('mongodb://localhost:27017/CafeApp')

//4)create a modal and schema for storing data
 const User=mongoose.model('User',{
    username:String,
    email:String,
    password:String
 })

 //5) model and schema for products
 const Products=mongoose.model('Products',{
   id:Number,
   Productname:String,
   category:String,
   photo:String,
   discription:String,
   price:Number,
   quantity:Number,
   grandTotal:Number
   
 })
// const Products=mongoose.model('Products',{
//    id:Number,
//    Productname:String,
//    category:String,
//    photo:String,
//    discription:String,
//    price:Number,
//    quantity:Number,
//    grandTotal:Number

// })
 //5) model and schema for cart
  const Carts=mongoose.model('Carts',{
   id:Number,
   Productname:String,
   category:String,
   price:Number,
   quantity:Number,
   grandTotal:Number
  })  



 module.exports={
    User,
    Products,
    Carts
 }