const knex=require("../model/database")

const friendlist=(req,res)=>{
    const details={
    user_id:req.body.user_id,
    friend_id:req.body.friend_id,
    }
    knex('friendlist').insert(details)
    .then((detail)=>{
        res.send({message:"data posted suessfully"})
        
    }).catch((err)=>{
        console.log(err);
        res.send({message:"already inserted",message:err})

    })
}
const get_all_requests=(req,res)=>{
    knex('friendlist')
    .join('users','friendlist.user_id','users.user_id')
    .select("*")
    .then((data)=>{
        res.send({message:'data selected',data:data})
    }).catch((err)=>{
        console.log(err)
        res.send(err)
    })
}
const delete_friend_id=(req,res)=> {
    knex.delete("*").from('friendlist').where("friend_id","=",req.params.friend_id)
    .then((data)=>{
        res.send({message:"delete friend id",data:data})
    }).catch((err)=>{
        res.send({message:"no delete"})
        console.log(err)
    })
  }
module.exports={friendlist,get_all_requests,delete_friend_id}