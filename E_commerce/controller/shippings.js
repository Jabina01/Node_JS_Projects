const knex=require("../model/db")

// get shipping regions
const get_shippings=(req,res)=>{
    knex.select('*').from('shipping')
    .then((getshipping)=>{
        res.json({
            success:true,
            message:"get shippings",
            shipping_region:getshipping
        })
    }).catch((err)=>{
        console.log(err)
        res.json({
            success:true,
            message:"data not found"
        })
    })                                                                                                                         
}

// get shipping regions bi id
const shipping_get_by_id=(req,res)=>{
    knex.select("*").from("shipping").where("shipping_region_id","=",req.params.shipping_region_id)
    .then((getshippingbyid)=>{
        if(getshippingbyid===0){
            res.send('data not found')
        }
        else{
        res.json({
            success:true,
            message:"get shippings",
            shipping_region:getshippingbyid
        })
    }
    }).catch((err)=>{
        console.log(err)
        res.json({
            success:true,
            message:"data not found"
        })
    })                                                                                                                         
}

module.exports={get_shippings,shipping_get_by_id}