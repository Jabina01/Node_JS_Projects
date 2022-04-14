const knex=require('../model/db')

// create an order
const orders=(req,res)=>{
    knex.select('*').from('shopping_cart')
    .where('cart_id',req.body.cart_id)
    .join("product",function(){
        this.on('shopping_cart.product_id','product.product_id')
    })
    .then((data)=>{
        console.log(data)
        const order={
            total_amount:data[0].quantity*data[0].price,
            created_on:new Date(),
            customer_id:req.userData.customer_id,
            shipping_id:req.body.shipping_id,
            tax_id:req.body.tax_id
        }
        console.log(order)
        knex('orders').insert(order)
        .then((insertdata)=>{
                // console.log(insertdata)
                knex('shopping_cart').where('cart_id',req.body.cart_id).del()
                    .then(()=>{
                        res.send({"order_id":insertdata[0]})

                        }).catch((err)=>{
                            res.send({message:"insertdata is not deleted"})   
                        })

        }).catch((err)=>{
            res.send(err)   
            })
        
        })
    
    }

// // get info about order
const Get_BYID_order_id=(req,res)=>{
    knex.select('*').from("orders").where('order_id',req.params.order_id)
    .then((Get_orders_id)=>{
        res.json({
            sucess:true,
            status:200,
            message:"get order _id sucessfully",
            Get_orders_id:Get_orders_id

        })
    }).catch((err)=>{
        res.json({
            sucess:false,
            status:500,
            message:"not get order _id sucessfully",
            err:err
            
        })
        console.log(err)
    })
}

// // get orders by customer
const Get_dataIncustomer_BYID=(req,res)=>{
    knex('orders')
    .join('customer','customer.customer_id','orders.order_id')
    .select('order_id','total_amount','created_on','shipped_on','status')
    .where('customer.customer_id',req.userData.customer_id)
    .then((order_data)=>{
        
        console.log(order_data)
        // res.send(err)
        res.json({
            sucess:true,
            status:201,
            message:"get order in customer_id sucessfully",
            order_data:order_data
        })
    }).catch((err)=>{
        res.json({
            sucess:false,
            status:500,
            message:"not get orders",
            err:err

        })
        console.log(err)
    })
}


// // get info about an order (short_details)
const Get_info_by_order_id=(req,res)=>{
    knex('orders')
    .join('customer','customer.customer_id','orders.order_id')
    .select('order_id','total_amount','created_on','shipped_on','status')
    .where('order_id',req.params.order_id)
    .then((short_dettails)=>{
        res.json({
            sucess:true,
            status:201,
            message:"get info about order sucessfully",
            short_dettails:short_dettails
            
        })
    }).catch((err)=>{
        res.json({
            sucess:false,
            status:500,
            message:"not get info",
            err:err

        })
        console.log(err)
    })
    
}


module.exports={orders,
    Get_BYID_order_id,
    Get_BYID_order_id,
    Get_dataIncustomer_BYID,
    Get_info_by_order_id}
	
