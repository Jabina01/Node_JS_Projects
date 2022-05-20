
const express=require('express')
const cookies =require("cookie-parser")
const router=express.Router()

const { signup, login }=require('../controllers/registration')

router.post('/signup',signup)
router.post('/login',login)

const { friendlist, get_all_requests, delete_friend_id }=require('../controllers/friendlist')


router.post('/friendlist',friendlist)
router.get('/allrequsts',get_all_requests)
router.delete('/friendid/:friend_id',delete_friend_id)

// requests
const {auth}=require('../controllers/verification')
const { my_profile }=require('../controllers/my_profile')
router.post('/request',auth,my_profile)
// post 
// const {auth}=require('../controllers/verification')
const { post_table }=require('../controllers/post')
router.post('/postdata',auth,post_table)

module.exports=router