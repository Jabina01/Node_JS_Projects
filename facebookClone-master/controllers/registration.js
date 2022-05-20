const knex=require("../model/database")
const jwt=require('jsonwebtoken')
const cookie=require('cookie-parser')
const bcrypt=require('bcrypt')
const signup=(req,res)=>{
    if (!req.body.username ||!req.body.password || !req.body.Email){
        res.status(400)
        return res.json({
            message:"failed "
        })
    }
    else{
        const hash=bcrypt.hashSync(req.body.password,10),

        user = {

            username:req.body.username,
            password:hash,
            Email:req.body.Email,
        }
        knex('users').insert(user)
        .then(()=>{
            res.send({message:"inserted"})
            
        }).catch((err)=>{
            console.log(err);
            res.send({message:"already inserted",message:err})

        })
    }
    
    }

const login=(req,res)=>{
    if(!req.body.password || !req.body.Email){
        res.send({message:'All fields require!'})
    }
    knex.select("*").from('users').where("Email","=",req.body.Email)

    .then((details)=>{
        if(details.length===0){
            res.send({message:'User not exist'})
        }else{
        
            var compare = bcrypt.compareSync(req.body.password,details[0].password)
            if(compare===false){
                res.send({message:'Invalid Email/password'})
            }else{
                const token=jwt.sign({id:details[0].id},"Aabirurashid",{expiresIn:"90h"})
                console.log(token)
                res.cookie('user',token)
                res.send({message:'Login Succesfully!',
                data:details,
                token:token})
            }
        }
        // console.log(details)
    })
}

module.exports={signup,login};