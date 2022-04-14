const express=require('express')
const router=express.Router()
const {signup,login}=require('../controller/app.js')
const {createPost,read, update_data, delete_data}=require('../controller/post')
const {auth}=require('../controller/verification')

router.post('/signup',signup)
router.post('/login',login)
router.post('/create/post',auth,createPost)
router.get('/read',read)
router.put('/update/:todo_id',update_data)
router.delete('/delete/:todo_id',delete_data)

module.exports=router
