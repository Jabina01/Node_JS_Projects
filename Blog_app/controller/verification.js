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


 
        
// const jwt=require('jsonwebtoken');
// // const TOKEN_SECRET="jabeenabano";
// const cookies=require('cookies')
// function verifytoken(req,res,next) {
//     const token=req.cookies;
//     console.log(token)
//     if (!token){
//         return res.status(401).send("Access Denied..")
//     }else{
//         verified= jwt.verify(token.user, "jabeenabano",(err,token)=>{
//             if(err){
//                 res.send({message:"Authentication error.."})
//             }else{
//                 res.token=token;
//                 next()
//             }
//         });
//     }
// }
// module.exports=verifytoken





