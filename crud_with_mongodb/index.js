const express=require("express")

const mongoose=require("mongoose")

const router=require('./router/router')

const app=express()

app.use(express.json())

app.use ("/",router)

app.listen(5000,()=>console.log('Listening to the port..'))