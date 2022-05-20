const knex=require("../model/db")

const likedislike=(req,res)=>{
    console.log(req.userData);
    knex.select("*").from('post')
    .then((data)=>{
        if(data.length===0){
            res.send('This post not exit!')
        }else{
            knex('likeDislike').insert({
                post_id:req.body.post_id,
                user_id                like:req.body.like,
                dislike:req.body.dislike

            })
            .then((data)=>{
                if(data.length>0){
                    res.send({message:'You are alreday like dislike this post!'})
                }else{
                    res.send({message:"you have sucessfully like or dislike",
                    data:data})
                }
              
        
            }).catch((err)=>{
                console.log(err);
                res.status(404).json({message:"can not  insert",})
            })
        }

    }).catch((err)=>{
        console.log(err)
    })
}

const read=(req,res)=>{
    knex('post')
    .leftJoin("likeDislike","post.postid","likeDislike.post_id")
    .select('*')
    .then((data)=>{
    console.log(data)
    res.send({message:"all done",
    data:data})
    }).catch((err)=>{
    console.log(err)
    res.send(err)
})
}
module.exports={likedislike,read}











// const knex=require("../model/db")

// const likedislike=(req,res)=>{
//     if (![1,0].includes(req.body.like) || ![1,0].includes(req.body.dislike)){
//         return res.send({message:"invailed like"})}

//     if (req.userData.id===null){
//     res.json({
//         status:"error",
//         message:"user has been loggedout "})
//     } 
//     else{

//     }
//     knex('post').where('post_id',req.body.post_id)
//     .then((post)=>{
//         if (post.length===0){
//             res.json({
//                 status:"error",
//                 message:"post doesnt exist"
//             })
//         }
//         else{
//             knex.select('*').from('likedislike').where({
//                 post_id:req.body.post_id,
//                 user_id:req.userData.id,            })
//             .then((likepost)=>{
//                 if (likepost.length>0){
//                     res.send({
//                         message:"u already liked/disliked the post"
//                     })
//                 }
//                 else{
//                     const likedislikepost={
//                         post_id:req.body.post_id,
//                         user_id:req.userData.id,
//                         // post_id:req.body.post_id,
//                         like:req.body.like,
//                         dislike:req.body.dislike
//                     }
//                 }
//             })
//         }
//     })
// }









// module.exports={likedislike}

