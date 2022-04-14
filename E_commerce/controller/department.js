const knex=require("../model/db")


// get all the data
const getdata=(req,res)=>{
    knex('department').select('*')
    .then((data)=>{
        res.send({message:"data send successfully",
    data:data})
    }).catch((err)=>{
        console.log(err)
    })
    
}

// get data by id
const get_by_id=(req,res)=>{
    knex.select("*").from("department").where("department_id",req.params.department_id)
    .then((user)=>{
        res.send({user})
        console.log(user)
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    }                                                                                                                          )
}
module.exports={getdata,
                get_by_id}