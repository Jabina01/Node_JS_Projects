const knex=require("../model/db")

// get tax data
const tax_get_data=(req,res)=>{
    knex.select('*').from('tax')
    .then((gettax)=>{
        res.json({
            success:true,
            status:200,
            message:"get tax data",
            allattributes:gettax
        })

        }).catch((err)=>{
            res.json({
                sucess:false,
                status:406,
                message:"data not found",
                err:err
        
            })
        })
}


// get tax data by id
const tax_data_byid=(req,res)=>{
    knex.select("*").from("tax").where("tax_id","=",req.params.tax_id)
    .then((user)=>{
        res.send({user})
        console.log(user)
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })                                                                                                                         
}

module.exports={tax_get_data,tax_data_byid}