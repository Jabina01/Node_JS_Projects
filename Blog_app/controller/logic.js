const knex=require("../model/db")
const jwt=require('jsonwebtoken')
const cookie=require('cookie-parser')
const bcrypt=require('bcrypt')
const signup=(req,res)=>{
    if (!req.body.username || !req.body.email || !req.body.password){
        res.status(400)
        return res.json({
            message:"failed "
        })
    }
    else{
        const hash=bcrypt.hashSync(req.body.password,10),

        user = {

            
            username:req.body.username,
            email:req.body.email,
            password:hash,
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
    if(!req.body.password || !req.body.email){
        res.send({message:'All fields require!'})
    }
    knex.select("*").from('users').where("email","=",req.body.email)

    .then((details)=>{

        if(details.length===0){
            res.send({message:'User not exist'})
        }else{
        
            var compare = bcrypt.compareSync(req.body.password,details[0].password)
            if(compare===false){
                res.send({message:'Invalid Email/password'})
            }else{
                // console.log(details);
                const token=jwt.sign({id:details[0].userid},"jabeenabano",{expiresIn:"8h"})
                console.log(token)
                res.cookie('user',token)
                res.send({message:'Login Succesfully!',
                data:details,
                token:token})
            }
        }
        console.log(details)
    })
}

const logout=(req,res)=>{
    res.clearCookies("token")
    res.send({message:"u have loggedout successfully"})
}
module.exports={ signup,login,logout};
	
