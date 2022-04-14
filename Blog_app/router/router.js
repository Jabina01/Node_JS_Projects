const express=require('express')
const router=express.Router()
const {signup,login,logout}=require('../controller/logic')
const {auth}=require("../controller/verification")
const {createPost}=require('../controller/post')
const { likedislike,read } = require('../controller/likedislike')

router.post('/signup',signup)
router.post('/login',login)
router.post('/post',auth,createPost)
router.post('/likedislike',auth,likedislike)
router.delete('/logout',logout)
router.get('/likedislike/post',auth,read)


module.exports=(router)