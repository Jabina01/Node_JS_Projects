const {post_data, get_data, getById, update_data, delete_data} = require("../controller/controller");

const express=require('express')

var router=express.Router();

router.post("/create",post_data)
router.get("/get",get_data)
router.get("/getbyid/:id",getById)
router.put("/updatebyid/:id",update_data)
router.delete("/deletebyid/:id",delete_data)




module.exports=router