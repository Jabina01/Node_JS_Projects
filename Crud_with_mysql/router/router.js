const express=require('express')
const router=express.Router()
const {insert_data,select_data,select_by_id,update_data,delete_data}=require('../controller/data')
router.post('/post',insert_data)
router.get('/get',select_data)
router.get('/getbyid/:id',select_by_id)
router.put('/api/update/:id',update_data)
router.delete('/api/delete/:id',delete_data)


module.exports={router}