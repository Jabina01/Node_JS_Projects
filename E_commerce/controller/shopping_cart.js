const knex=require('../model/db')
const generateUniqueid=require('generate-unique-id')


// generate a unique id
const get_generateUnique=(req,res)=>{
    id=generateUniqueid({
        includeSymbols:['@','#','|'],
        excludeSymbols:['0']
    })
    res.send({cart_id:id})
}

// add to shopping_cart
const shoppindcart_add=(req,res)=>{
    const add={
        cart_id:req.body.cart_id,
        product_id:req.body.product_id,
        attributes:req.body.attributes,
        quantity:1,
        added_on:new Date()
    }
    knex('shopping_cart').insert(add)
        .then((data)=>{
            knex('shopping_cart')
            .select('*').where('item_id',data)
                .then((postdata)=>{
                    res.json({
                        sucess:true,
                        status:200,
                        message:"post sucessfully",
                        data:postdata
                    })
                }).catch((err)=>{
                    console.log(err)
                    res.send({message:"not posted anything",err:err})

                })
        }).catch((err)=>{
            console.log(err)
            res.send({
                message:"failled",
                err:err
            })
        })

}

// get all the list from shopping_cart
const shopping_data=(req,res)=>{
    knex.select('*').from('shopping_cart')
    .then((shopping_cart)=>{
        res.send({message:'get data sucessfully',data:shopping_cart})
    }).catch((err)=>{
        res.send({message:"not get data",err:err})
        console.log(err)
    })
}


// update the shopping_cart
const updatecartByItem=(req,res)=>{
    knex('shopping_cart').where('item_id',req.params.item_id)
    .update({
        quantity:req.body.quantity
    })
    .then((data)=>{
        knex.select('*').from('shopping_cart').where('item_id',req.params.item_id)
        .then((quantity)=>{
            if (quantity.length===0){
                res.send({
                    message:"you dont have any item"
                })
            }
            else{
                res.json({
                    sucess:true,
                    message:"update the cart item",
                    updatecartitem:quantity

                })
            }
        }).catch((err)=>{
            res.json({
                message:"update failed"
            })
        })
    }).catch((err)=>{
        res.json({
            message:"not found item id"
        })
        console.log(err)
    })
}


// empty cart 
const empty_cart=(req,res)=>{
    knex.delete('*').from('shopping_cart').where('cart_id',req.params.cart_id)
    .then((data)=>{
        console.log('data',data)
        knex.select('*').from('shopping_cart').where('item_id',data)
        .then((emptycart)=>{
            console.log(emptycart)
            res.json({
                empty_cart:"deleted successfully"
            })
        }).catch((err)=>{
            res.json({
                message:"invailed card id"
            })
        })
    }).catch((err)=>{
        res.json({
            err:err
        })
    })
}



// get total_amount
const gettotal_amount_bycart=(req,res)=>{
    knex('shopping_cart')
    .join('product','shopping_cart.product_id','product.product_id')
    .select('*').where('cart_id',req.params.cart_id)
    .then((data)=>{
        sum=0
        for (i of data){
            sum+=i.price*i.quantity
        }
        res.send({
            total_amount:sum
        })
    }).catch((err)=>{
        console.log(err)
    })
}


// remove product from cart
const remove_product_from_cart=(req,res)=>{
    knex.delete('*').from('shopping_cart').where('item_id',req.params.item_id)
    .then((data)=>{
        knex.select('*').from('shopping_cart').where('item_id',data)
        .then((delete_product)=>{
            console.log(delete_product)
            res.json({
                del_product:"product has been deleted by item_id successfully"
            })
            }).catch((err)=>{
                res.json({
                    message:err
                })
            })
        }).catch((err)=>{
            res.json({
                message:err
            })
        })
}



module.exports={get_generateUnique,
    shoppindcart_add,
    shopping_data,
    updatecartByItem,
    empty_cart,
    gettotal_amount_bycart,
    remove_product_from_cart}