const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const {router}=require("./router/router")
const port=5000
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use('/',router);

app.listen(port,()=>{
    console.log("server is listening....")
})