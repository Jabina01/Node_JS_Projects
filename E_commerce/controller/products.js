const knex=require("../model/db")


// get all data by products
const get_product_data=(req,res)=>{
    knex('product').select('*')
    .then((data)=>{
        res.send({data})
        console.log(data)
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })
}


// search product
const searchproduct= (req, res) => {
    var query = []
    var result2 = []
    knex.select("*").from("product").
    then((result) => {

            if (req.query.page == undefined) {
                req.query.page = 1
            }
            if (req.query.limit == undefined) {
                req.query.limit = 0                                                        //OFset is use for the set the limit  in program
            }
            knex.select("*").from("product").offset((req.query.page - 1) * req.query.limit).limit(req.query.limit).
            then((data) => {
                    if (req.query.query_string != undefined) {
                        for (i in data) {
                            if (req.query.query_string.includes(data[i]["description"]) == true) {
                                query.push(data[i])
                            } else {
                                query.push(data[i])
                            }
                        }
                        for (j in query) {
                            if (req.query.description_length != undefined) {
                                query[j]["description"] = query[j]["description"].slice(0, query[j]["description"].length - (query[j]["description"].length - req.query.description_length)) + ".."
                                result2.push(query[j])
                            } else {
                                query[j]["description"] = query[j]["description"]
                                result2.push(query[j])
                            }

                        }
                        res.send({count:req.query.limit,
                                row:result2})
                    } else {
                        res.send("query is not there")
                    }
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.send(err)
        })
}

// get by id
const pro_get_by_id=(req,res)=>{
    knex.select("*").from("product").where("product_id","=",req.params.product_id)
    .then((user)=>{
        res.send({user})
        console.log(user)
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })                                                                                                                         
}

// get a list of products of categories
const get_product_join_category=(req,res)=>{
    count=0
    let page=req.query.page
    let limit=req.query.limit
    let description=req.query.description

    if (page && limit){
        page=parseInt(page)
        limit=parseInt(limit)
        page=page*limit-limit
    }
    else{
        page=0
        limit=101
    }
    knex('product')
        .join('product_category','product.product_id','product_category.product_id')
        .select('product.product_id','product.name','product.description','product.description','product.price','product.discounted_price','product.thumbnail')
        .where('product_category.category_id',req.params.category_id).limit(limit).offset(page)
        .then((catebyid)=>{
            for (i of catebyid){
                console.log(i);
                if (description!=undefined){
                    i.description=i.description.slice(0,parseInt(description))
                }
            }
            console.log(catebyid)
            res.json({

                message:"get product by category id",
                count:limit,
                rows:catebyid
            })
                
        }).catch((err)=>{
            console.log(err)
            res.json({
                success:false,
                status:405,
                message:"somethig went wrong"
            })
        })

}


// get a list of products in department
const get_product_join_department=(req,res)=>{
    let page=req.query.page
    let limit=req.query.limit
    let description=req.query.description

    if (page && limit){
        page=parseInt(page)
        limit=parseInt(limit)
        page=page*limit-limit
    }
    else{
        page=0
        limit=101
    }
    knex('product')
        .join('product_category','product.product_id','product_category.product_id')
        .join('category','category.category_id','product_category.category_id')
        .select('product.product_id','product.name','product.description','product.description','product.price','product.discounted_price','product.thumbnail')
        .where('product_category.category_id',req.params.department_id).limit(limit).offset(page)
        .then((deptbyid)=>{
            for (i of deptbyid){
                console.log(i);
                if (description!=undefined){
                    i.description=i.description.slice(0,parseInt(description))
                }
            }
            console.log(deptbyid)
            res.json({

                message:"get product by department id",
                count:limit,
                rows:deptbyid
            })
                
        }).catch((err)=>{
            console.log(err)
            res.json({
                success:false,
                status:405,
                message:"somethig went wrong"
            })
        })

}


// get details of a product
const product_details_byid=(req,res)=>{
    knex.select('product_id','name','description','price','discounted_price','image','image_2').from('product')
    .then((details)=>{
        res.json({
            success:true,
            status:200,
            message:"data details",
            allattributes:details
        })

        }).catch((err)=>{
            res.json({
                sucess:false,
                status:406,
                message:"something went wrong",
                err:err
        
            })
        })
}



// post reviews
const post_reviews=(req,res)=>{
    if (!req.body.product_id || !req.body.review || !req.body.rating){
        res.json({
            status:400,
            message:'failed'
        })
    }
    else{
        const giveRieview={
            customer_id:req.body.customer_id,
            product_id:req.body.product_id,
            review:req.body.review,
            rating:req.body.rating,
            created_on:new Date()
        }
        knex('review').insert(giveRieview)
        .then((data)=>{
            knex.select('*').from('review').where('review_id',data)
            .then((post)=>{
                res.json({
                    success:true,
                    message:"your product review successfully submitted",
                    review:post
                })
            }).catch((err)=>{
                console.log(err)
                res.json({
                    success:false,
                    message:"product_id not exists"
                })
            })
        })
    }
}


// get reviews
const get_reviewById=(req,res)=>{
    knex('review')
    .innerJoin('customer','review.customer_id','customer.customer_id')
    .select('customer.name','review.review','review.created_on')
    .where('product_id',req.params.product_id)
    .then((reviewData)=>{
        console.log(reviewData)
        res.json({
            success:true,
            message:'your review data',
            review_data:reviewData
        })
    }).catch((err)=>{
        console.log(err)
        res.status(400).json({
            success:false,
            message:"auth err"
        })
    })
}

module.exports={get_product_data,
    pro_get_by_id,
    searchproduct,
    get_product_join_category,
    get_product_join_department,
    product_details_byid,
    post_reviews, 
    get_reviewById}