const knex=require('../model/db')

const createPost=(req,res)=>{
    console.log(req.userData);
    const dic1={
        id:req.userData.id,
        title:req.body.title,
        description:req.body.description
    }
    knex("post").insert(dic1)
    .then(()=>{
        res.send({message:'New Blog Post!'})
        console.log("data inserted")
    }).catch((err)=>{
        res.send(err)
    })
}

module.exports={createPost}