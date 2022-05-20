const knex=require("../model/database")

const post_table=(req,res)=>{
    const details={
    user_id:req.usrdata.user_id,
    Title:req.body.Title,
    description :req.body.description,
    type:req.body.type 
    }
    knex('post').insert(details)
    .then((details)=>{
        res.send({message:"data posted suessfully"})
        
    }).catch((err)=>{
        console.log(err);
        res.send({message:"already inserted",message:err})

    })


}
module.exports={
    post_table
}