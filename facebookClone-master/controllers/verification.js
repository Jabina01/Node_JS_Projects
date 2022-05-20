const jwt=require('jsonwebtoken')
const cookies=require("cookie-parser")
const auth=(req,res,next)=>{
    try{
        var token=req.cookies.user
        console.log(token)
        var decode=jwt.verify(token,"Aabirurashid")
        req.usrdata=decode
        // console.log(usrdata)
    next()
    }catch(err){
        res.status(400).json({
            err:"invalid token"
        })
        console.log(err);
    }


}
module.exports={auth}