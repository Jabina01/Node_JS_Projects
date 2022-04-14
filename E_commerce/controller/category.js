const knex=require("../model/db")

// get all data
const category=(req,res)=>{
    knex('category').select('*')
    .then((data)=>{
        res.send({message:"data send successfully",
    data:data})
    }).catch((err)=>{
        console.log(err)
    })
    
}


// get data by id
const Get_by_id=(req,res)=>{
    knex.select("*").from("category").where("category_id","=",req.params.category_id)
    .then((user)=>{
        res.send({user})
        console.log(user)
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })                                                                                                                         
}

// get data by product_id
const Get_join_category_product=(req,res)=>{
    knex('category')
        .join('product_category','product_category.category_id','category.category_id')
        .select('product_category.category_id','department_id','category.name').where('product_category.product_id','=',req.params.product_id)
        .then((users)=>{
            res.send({users})
            console.log(users)
        }).catch((err)=>{
            res.send(err)
            console.log(err)
        })
}


// get data by department_id
const Get_join_category_department=(req,res)=>{
    knex('category')
    .join('department','department.department_id',"category.department_id")
    .select('category_id','category.name','category.description',"category.department_id")
    .where('department.department_id',req.params.department_id)
    .then((data)=>{
        res.send({message:"users send data successfully",
    data:data})
        
        console.log(data)
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })
}


module.exports={category,
    Get_by_id,
    Get_join_category_product,
    Get_join_category_department}