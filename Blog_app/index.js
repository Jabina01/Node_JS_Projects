const express=require('express');
const cookie=require('cookie-parser')
const bodyParser=require('body-parser');
const port=5000
const app=express();
app.use(cookie())

const router=require('./router/router')
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use('/',router);

app.listen(port,()=>{
    console.log("server is listening....")
})