var jwt =require("jsonwebtoken");
const auth=(req,res,next)=>{
    try{
        var token=req.cookies.user
        console.log(token)
        var decode=jwt.verify(token,"jabeenabano")
        req.userData=decode;
        console.log(decode)
        next();
    }catch(err){
        res.status(401).json({
            err:"invailed token"
        })
    }
}
module.exports={auth}
