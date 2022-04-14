const knex=require('../model/database')

const insert_data=(req,res)=>{
    const users={
    name:req.body.name,
    logo:req.body.logo,
    notes:req.body.notes,
    days_to_complete:req.body.days_to_complete,
    short_description:req.body.short_description,
    type:req.body. type,
    course_type:req.body.course_type
}
knex("mydata").insert(users)
.then((users)=>{
    res.send({message:"new data is added"})
}).catch((err)=>{
    console.log(err);
    res.send(err)
})
}

const select_data=(req,res)=>{
    knex('mydata').select('*')
    .then((users)=>{
        res.send({message:"data is selected",users:users})
    }).catch((err)=>{
        console.log(err)
        res.send(err)
    })
}

const select_by_id=(req,res)=>{
    knex.select("*").from('mydata').where({id:req.params.id})
        .then((users)=>{
        res.send({message:"data is selected by id",users:users})
    }).catch((err)=>{
        console.log(err)
        res.send(err)
    })
}

const update_data=(req,res)=>{
    knex.select("*").from('mydata').where("id","=",req.params.id)
    .update({
        id:req.body.id,
        name:req.body.name,
        logo:req.body.logo,
        notes:req.body.notes, 
        days_to_complete:req.body.days_to_complete,
        short_description:req.body.short_description, 
        type:req.body.type, 
        course_type:req.body.course_type
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
      knex.delete('*').from('mydata').where('id',"=",req.params.id)
      .then((users)=>{
          res.send({message:"data has been deleted",users,users})
      }).catch((err)=>{
          res.send({message:"not delete"})
        console.log(err)
      })
}


module.exports={insert_data,select_data,select_by_id,update_data,delete_data}