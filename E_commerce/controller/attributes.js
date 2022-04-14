const knex=require("../model/db")


// get data
const attributes=(req,res)=>{
    knex.select('*').from('attribute')
    .then((getatt)=>{
        res.json({
            success:true,
            status:200,
            message:"get attributes data",
            allattributes:getatt
        })

        }).catch((err)=>{
            res.json({
                sucess:false,
                status:406,
                message:"data not fount",
                err:err
        
            })
        })
}


// get by id
const attri_get_by_id=(req,res)=>{
    knex.select("*").from("attribute").where("attribute_id","=",req.params.attribute_id)
    .then((user)=>{
        res.send({user})
        console.log(user)
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })                                                                                                                         
}

// get by value
const get_attribute_value=(req,res)=>{
    knex('attribute')
        .join('attribute_value','attribute_value.attribute_id,attribute.attribute_id')
        .select('*').where('attribute_value.attribute_id',"=",req.params.attribute_id)
        .then((getattrival)=>{
            res.send({
                success:true,
                status:200,
                message:"get attributes_value data",
                attribute_value:getattrival
            })
    
            }).catch((err)=>{
                res.json({
                    sucess:false,
                    status:406,
                    message:"data not fount",
                    err:err
            
                })
            })
    }


// join_attribute_attribute_value

const get_product_attribute=(req,res)=> {
    knex('attribute')
    .join('attribute_value','attribute_value.attribute_id','attribute.attribute_id')
    .join('product_attribute','product_attribute.attribute_value_id','attribute_value.attribute_value_id')
    .select({'attribute':'attribute.name',
    'attribute_value_id':'attribute_value.attribute_value_id',
    'attribute_value':'attribute_value.value'})
    .where("product_attribute.product_id",req.params.product_id)
    .then((attrvlu)=>{
        res.send({
            sucess:true,
            status:200,
            message:"getting data from attribute value successfully",
            attribute_value:attrvlu
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



module.exports={attributes,
    attri_get_by_id,
    get_attribute_value,
    get_product_attribute}