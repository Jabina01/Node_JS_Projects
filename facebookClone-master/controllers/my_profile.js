const knex=require("../model/database")

const my_profile=(req,res)=>{
    const details={
    user_id:req.body.user_id,
    friend_id:req.body.friend_id,
    }
    knex('friendlist').insert(details)
    .then((detail)=>{
        res.send({message:"posted suessfully"})
        
    }).catch((err)=>{
        console.log(err);
        res.send({message:"already inserted",message:err})

    })
}
module.exports={my_profile}