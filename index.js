//Backend for cafe system management

//create a server application using express
//1) import express

const express=require('express')

//4) import cors
const cors = require('cors')
const logic=require('./services/logic')

//import jwt token
const jwt = require('jsonwebtoken')

//2) create a server application using server

const server= express()

//5)to use cors

server.use(cors({
    origin:'http://localhost:4200'
}))

server.use(express.json())



//3)set up path for server application

server.listen(5000,()=>{
    console.log('server listing on port 5000');
})

//Api call to resolve - localhot/5000

server.get('/',(req,res)=>{
    res.send('welcome to backend')
})
//Router-level middleware
const jwtMiddleware = (req,res,next)=>{
    console.log('Routerlevel middleware');
    try{

        const token=req.headers['verify-token']
        console.log(token);
        const data=jwt.verify(token,'superkey2023')
        console.log(data);
        next()
        
    }catch{
        res.status(401).json({message:'please Login'})
     }

}


//Api call for register - localhost:5000/register

server.post('/register',(req,res)=>{
    console.log('Inside registration API call');
    console.log(req.body);
    //logic to resolve register request
    logic.register(req.body.username,req.body.email,req.body.password).then((response)=>{
        res.status(response.statuscode).json(response)
    })
    
})

//Api call for login
server.post('/login',(req,res)=>{
    console.log("Inside login Api call");
    logic.login(req.body.username,req.body.password).then((response)=>{
        res.status(response.statuscode).json(response)
    })
})

//api call to add products
server.post('/addProducts',(req,res)=>{
    console.log("inside add products Api call");
    logic.addProducts(req.body.id,req.body.Productname,req.body.category,req.body.discription,req.body.price,req.body.quantity,req.body.grandTotal,req.body.photo).then((response)=>{
        res.status(response.statuscode).json(response)
    })
})

//api call to viewallProducts
server.get('/viewAllProducts',(req,res)=>{
    console.log('inside api call to view all products');
    logic.viewProducts().then((response)=>{
        res.status(response.statuscode).json(response)  
    })
})

//api call to delete particular product from mongodb
server.delete('/deleteProduct/:id',(req,res)=>{
    console.log("inside Api call for delete product details");
    logic.deleteProduct(req.params.id).then((response)=>{
        res.status(response.statuscode).json(response) 
    })
})



//api call to get product one by one to the order
server.get('/viewProductsonebyone',(req,res)=>{
    console.log("inside api call to view data one by one");
    logic.viewProductonebyone().then((response)=>{
        res.status(response.statuscode).json(response)
    })
})

//api call to view particular product
server.get('/viewparticularproduct/:id',(req,res)=>{
    console.log("inside api to view particular product");
    logic.viewParticularProduct(req.params.id).then((response)=>{
        res.status(response.statuscode).json(response)
    })
})

//api call to edit particular product details
server.post('/editproductDetails/:id',(req,res)=>{
    console.log('inside Api call to edit particular product details')
    logic.editProduct(req.params.id,req.body.Productname,req.body.category,req.body.discription,req.body.price).then((response)=>{
        res.status(response.statuscode).json(response)
    })
})



//api call to add to cart
server.post('/addtoCart',(req,res)=>{
    console.log("inside api call for add to cart");
    logic.addtoCart(req.body.id,req.body.Productname,req.body.category,req.body.price,req.body.quantity).then((response)=>{
        res.status(response.statuscode).json(response)
    })
})

//api call to get cart
server.get('/getCart',(req,res)=>{
    console.log("inside api call to get cart");
    logic.getCart().then((response)=>{
        res.status(response.statuscode).json(response)
    })
})

//api call to delete cart products
server.delete('/deleteCartproduct/:id',(req,res)=>{
    console.log('inside api call to delete cart product');
    logic.cartDelete(req.params.id).then((response)=>{
        res.status(response.statuscode).json(response)
    })
})

//api call to increment product
server.get('/incrementProduct/:id',(req,res)=>{
    console.log('inside api call increment products');
    logic.incrementProduct(req.params.id).then((response)=>{
        res.status(response.statuscode).json(response)
    })
})

//api call to decrement product
server.get('/decrementProduct/:id',(req,res)=>{
    console.log('inside api call decrement products');
    logic.decrementProduct(req.params.id).then((response)=>{
        res.status(response.statuscode).json(response)
    })
})

//api call to delete all product
server.delete('/deleteAllproduct',(req,res)=>{
    console.log('inside api call to delete all products');
    logic.deleteCart().then((response)=>{
        res.status(response.statuscode).json(response)
    })
})

//api call to delete user account
server.delete('/deleteAccount/:username',(req,res)=>{
    console.log('inside api call to delete user account');
    logic.deleteAccount(req.params.username).then((response)=>{
        res.status(response.statuscode).json(response)
    })
})

//api call change password
server.post('/changePassword/:username',(req,res)=>{
    console.log("inside api call to change password");
    logic.changePassword(req.params.username,req.body.password).then((response)=>{
        res.status(response.statuscode).json(response)
    })
})