const knex = require("../model/db")
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')

// Register a customer
const registrationcustomer=(req,res)=>{
    if (!req.body.name || !req.body.email || !req.body.password){
        res.json({
            sucess:false,
            status:406,
            message:"data not fount",
            err:err

        })
    }
    else{
        const users={
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }
        console.log(req.body);
        knex('customer').insert(users)
        .then((data)=>{
            knex.select('*').from('customer').where('customer_id',data)
            .then((insertdata)=>{
                res.json({
                    sucess:true,
                    status:200,
                    message:"you r registerd successfully",
                    users:insertdata
                })

            }).catch((err)=>{
                res.send({
                    err:"invailed details!"
                })
            })

        }).catch((err)=>{
            console.log(err)
            res.json({
                sucess:false,
                status:406,
                message:"email already exists",
                err:err

            })

        })

    }
}


// login a customer
const customerslogin=(req,res)=>{
    if (!req.body.email || !req.body.password){
        res.status(401).json({
            success:false,
            message:"failed required both fild"
        })
    }
    else{
        knex.select('*').from('customer').where('email',"=",req.body.email,'password',"=",req.body.password)
        .then((data)=>{
            if (data.length<1){
                res.status(400).json({
                    message:"email failed"
                })
            }
            else{
                var token=jwt.sign({customer_id:data[0].customer_id},'jabeenabano',{expiresIn:"7h"})
                res.cookie("user",token)
                res.json({
                    success:true,
                    status:200,
                    message:"you are login successfully",
                    users:data,
                    token:token
                })
            }
        }).catch((err)=>{
            res.json({
                success:false,
                status:400,
                message:"auth err"
            })
        })
    }
}

// get a customer by id
const get_customer_byID=(req,res)=>{
    knex.select("*").from('customer').where("customer_id",req.params.customer_id)
    .then((customer_id_data)=>{
        res.send({message:"get_customer_id sucessfully",customer_id_data:customer_id_data})
        console.log(user);
    }).catch((err)=>{
        console.log(err)
        res.send({error:"not get_customer_id sucessfully",err:err})
    })

}

// update a customer
const update_customers=(req,res)=>{
    knex.from('customer').where('customer_id',req.params.customer_id)
    .update({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        day_phone:req.body.day_phone,
        eve_phone:req.body.eve_phone,
        mob_phone:req.body.mob_phone
    }).then((updatedata)=>{
        res.send({message:"update sucessfully",updatedata:updatedata})

    }).catch((err)=>{
        console.log(err)
        res.send({error:"not updated",error:err})
    })
}


// update customer address
const update_customer_adress=(req,res)=>{
    knex.from('customer').where('customer_id',req.params.customer_id).update({
        address_1:req.body.address_1,
        address_2:req.body.address_2,
        city:req.body.city,
        region:req.body.region,
        postal_code:req.body.postal_code,
        country:req.body.country,
        shipping_region_id:req.body.shipping_region_id
    }).then((updateAddress)=>{
        res.send({message:"update address data sucessfully",updateAddress:updateAddress})
    }).catch((err)=>{
        res.send({error:"not update address data sucessfully"})
        console.log(err)
    })
}


// update customer credit card
const update_credit_card=(req,res)=>{
    knex.from('customer').where('customer_id',req.params.customer_id)
    .update({
        credit_card:req.body.credit_card
    }).then((credit_cardata)=>{
        res.send({message:"update credit card sucessfully",credit_cardata:credit_cardata})
    }).catch((err)=>{
        console.log(err)
        res.send({message:"update credit card sucessfully"})
    })
}


module.exports = { registrationcustomer,
    customerslogin,
    get_customer_byID,
    update_customers,
    update_customer_adress,
    update_credit_card}