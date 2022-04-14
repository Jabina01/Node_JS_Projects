const express =require('express')
const bodyParser=require('body-parser')
const cookie=require('cookie-parser')
const port=5000
const app=express();

const router=require('./router/router')
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cookie())
app.use('/',router);

app.listen(port,()=>{
    console.log("server is listening....")
})