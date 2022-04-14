const knex=require('../model/db')

const createPost=(req,res)=>{
    const dic1={
        user_id:req.body.user_id,
        title:req.body.title,
        description:req.body.description
    }
    knex("todolist").insert(dic1)
    .then(()=>{
        res.send({message:'Posted!'})
        console.log("data inserted")
    }).catch((err)=>{
        res.send(err)
    })
}


const read=(req,res)=>{
    knex('todolist')
    .join("Users","todolist.user_id","Users.user_id")
    // .select('todolist.title','todolist.description','Users.username')
    .select("*")
    .then((data)=>{
    console.log(data)
    res.send({message:"all done",
    data:data})
    }).catch((err)=>{
    console.log(err)
    res.send(err)
})
}


const update_data=(req,res)=>{
    knex.select("*").from('todolist').where("todo_id","=",req.params.todo_id)
    .update({
        title:req.body.title,
        description:req.body.description
        
    })
    .then((users)=>{
        console.log(users)
        res.send({message:"data is updated",users:users})
    }).catch((err)=>{
        console.log(err)
        res.send(err)
    })
}

const delete_data=(req,res)=>{
      knex.delete('*').from('todolist').where('todo_id',"=",req.params.todo_id)
      .then((users)=>{
          res.send({message:"data has been deleted",users,users})
          console.log("data has been deleted")
      }).catch((err)=>{
          res.send({message:"not delete"})
        console.log(err)
      })
}

module.exports={createPost,read,update_data,delete_data}