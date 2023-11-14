//import db (to get modal-User)
const { response } = require('express')
const db=require('./db')

//import jwt token
const jwt = require('jsonwebtoken')

//logic for register
const register=(username,email,password)=>{
    return db.User.findOne({email}).then((response)=>{
        console.log(response);
        if(response){
            return{
                statuscode:401,
                message:"User already exist"
            }
        }else{
            const newUser=new db.User({
                username,
                email,
                password
            })
            //To store new user database
            newUser.save()
                //response send back to clint
                return{
                statuscode:200,
                message:"Registration Sucessful"
                
            }
        }
    })

}
//login
const login=(username,password)=>{
    return db.User.findOne({username,password}).then((response)=>{
        console.log(response);
        if(response){
            //token generation
            const token=jwt.sign({
                loginUsername:username
            },'superkey2023')
            return{
                currentUser:response.username,
                statuscode:200,
                message:"Login Successsful",
                token
                
            }
        }else{
            return{
                statuscode:401,
                message:"Invalid Login"
            }
        }
    })
}

//add products
const addProducts=(id,Productname,category,discription,price,photo)=>{
    return db.Products.findOne({id,Productname}).then((response)=>{
        console.log(response);
        if(response){
            return{
                statuscode:401,
                message:"Item already exist"
            }
            

        }else{
            const newProducts= new db.Products({
                id,
                Productname,
                category,
                discription,
                photo,
                price,
                quantity:1,
                grandTotal:'',
               
            })
            //to save new product
            newProducts.save()
            return{
                statuscode:200,
                message:"Product added successfully"
                
            }
        }
    })
}

//view all products in mongodb
const viewProducts=()=>{
    return db.Products.find().then((response)=>{
        console.log(response);
        if(response){
            
            return{
                data:response,
                statuscode:200,
                message:"Data fetched succesfully"
                
            }
           

        }else{
            return{
            statuscode:401,
            message:'faild to fetch data'
            }
        }
    })
}

//to delete particular product from mongodb
const deleteProduct=(id)=>{
    return db.Products.deleteOne({id}).then((response)=>{
        console.log(response);
        if(response){
           
            return{
                
                statuscode:200,
                message:"product detials deleted"
            }
        }else{
            return{
                statuscode:401,
                message:'product details not deleted'
                }
        }
    })
}





//fetch data one by one to the order
const viewProductonebyone=()=>{
    return db.Products.find().then((response)=>{
        console.log(response);
        if(response){

          
            return{
                data:response,
                statuscode:200,
                message:"Data fetched succesfully"
            }
        }else{
            return{
            statuscode:401,
            message:'faild to fetch data'
            }
        }
    })
}

//view particular product
const viewParticularProduct=(id)=>{
    return db.Products.findOne({id}).then((response)=>{
        console.log(response);
        if(response){
            
            return{
                data:response,
                statuscode:200,
                message:"particular product details fetched"
                
            }
           

        }else{
            return{
            statuscode:401,
            message:'particular product not fetched'
            }
        }
    })
}


//edit productv details
const editProduct=(id,Productname,category,discription,price)=>{
   return db.Products.findOne({id}).then((response)=>{
          response.id=id
          response.Productname=Productname
          response.category=category
          response.discription=discription
          response.price=price

          response.save()

          return{
            response,
            statuscode:200,
            message:"edited sucessfully"
          }
   })
}


//add to cart
const  addtoCart =(id,Productname,category,price,quantity)=>{
  
    return   db.Carts.findOne({id}).then((response)=>{
        // response.await
        if(response){
            response.quantity+=1
            response.grandTotal=response.price*response.quantity
            response.save()
            return{
                statuscode:200,
                message:"producted updated successfully"
            }

        }else{
            const newProducts=new db.Carts({
                id,
                Productname,
                category,
                price,
                quantity,
                grandTotal:price
            })
            //to save new product
            newProducts.save()
            return{
                statuscode:200,
                message:"producted added successfully"
            }
        }
    })
}
//get cart products
const getCart=()=>{
    return db.Carts.find().then((response)=>{
        if(response){
            return{
                data:response,
                statuscode:200,
                message:"all products details fetched"
            }
        }else{
            return{
                statuscode:401,
                message:'faild to fetch data'
            }
        }
    })
}

//delete cart product
const cartDelete=(id)=>{
    return db.Carts.deleteOne({id}).then((response)=>{
        console.log(response);
        if(response){
            return{
                statuscode:200,
                message:"Product deleted from cart"
            }
        }else{
            return{
                statuscode:401,
                message:"Product not delete from cart"
            }
        }
    })
}

//increment products
  const incrementProduct=(id)=>{
    return db.Carts.findOne({id}).then((response)=>{
        console.log(response);
        if(response){
            response.quantity+=1 //increment the quantity by 1
            response.grandTotal=response.price*response.quantity
            response.save()
            const allCart=db.Carts.find()
            return{
                statuscode:200,
                message:"One more Added"
            }
        }else{
            return{
                statuscode:401,
                message:"Faild to add more products"
            }
        }
    })
  }

  //decrement product
  const decrementProduct=(id)=>{
    return db.Carts.findOne({id}).then((response)=>{
        console.log(response);
        if(response){
            response.quantity-=1
           if(response.quantity==0){
            //remove product from cart
            db.Carts.deleteOne({id})
        //     //  db.Carts.find().then((result)=>{
        //     console.log(result);
        //    })
            return{
                
                statuscode:200,
                messange:"product removed from the cart"
            }
           }else{
            response.grandTotal=response.price*response.quantity
            response.save()
            return{
                statuscode:200,
                messange:"Product details updated"
            }
           }
            
        }else{
            return{
                statuscode:401,
                messange:"Product not found"
            }
        }
        
  })
}

  //delete all products from cart
  const deleteCart=()=>{
   return db.Carts.deleteMany().then((response)=>{
    if(response){
        return{
            statuscode:200,
            message:"all Products deleted from cart"
        }
    }else{
        return{
            statuscode:401,
            message:"all Product not delete from cart"
        }
    }

   })
  }

  //delete user account
  const deleteAccount=(username)=>{
    return db.User.deleteOne({username}).then((result)=>{

        return{
            result,
            statuscode: 200,
            message:"Account deleted sucesfully"
        }

    })
  }

  //edit user password 
  const changePassword=(username,password)=>{
    return db.User.findOne({username}).then((response)=>{

        response.password=password
        response.save()
        return{
            statuscode:200,
            message:"Password Changed successfully"
        }
    },
    (response)=>{
        return{
            statuscode:401,
            message:"Account not found...!"
        }
    }
    )
  }
    
  


module.exports={
    register,
    login,
    addProducts,
    viewProducts,
    deleteProduct,
   viewProductonebyone,
   viewParticularProduct,
   editProduct,
    addtoCart,
    getCart,
    cartDelete,
    incrementProduct,
    decrementProduct,
    deleteCart,
    deleteAccount,
    changePassword

}