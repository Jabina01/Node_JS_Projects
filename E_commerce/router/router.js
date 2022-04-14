const express=require('express')
const router=express.Router()
const {auth}=require('../middleware/verification')


// departmemts
const {getdata, get_by_id}=require('../controller/department')

router.get('/getdata',getdata)
router.get('/getbyid/:department_id',get_by_id)

// category
const { category, Get_by_id,Get_join_category_product,Get_join_category_department } = require('../controller/category')

router.get('/category',category)
router.get('/category/:category_id',Get_by_id)
router.get('/category/inproduct/:product_id',Get_join_category_product)
router.get('/category/indepartment/:department_id',Get_join_category_department)

// attributes
const { attributes,attri_get_by_id,get_attribute_value ,get_product_attribute} = require('../controller/attributes')

router.get('/attributes',attributes)
router.get('/attributesbyid/:attribute_id',attri_get_by_id)
router.get('/attributevalue/:attribute_id',get_attribute_value)
router.get('/attributesAttvalue/:product_id',get_product_attribute)


// products
const {get_product_data,pro_get_by_id,searchproduct,get_product_join_category,get_product_join_department,product_details_byid,post_reviews,get_reviewById}=require('../controller/products')

router.get('/products',get_product_data)
router.get('/products/search',searchproduct)
router.get('/products/:product_id',pro_get_by_id)
router.get('/products/incategory/:category_id',get_product_join_category)
router.get('/products/indepartment/:department_id',get_product_join_department)
router.get('/products/details/:product_id',product_details_byid)
router.post('/products/reviews',auth,post_reviews)
router.get('/product/getreview/:product_id', get_reviewById)


// customers
const {registrationcustomer,customerslogin,get_customer_byID,update_customers,update_customer_adress,update_credit_card}=require('../controller/customers')

router.post('/registration/customer',registrationcustomer)
router.post('/login/customer',customerslogin)
router.get('/get/customer/:customer_id',auth,get_customer_byID)
router.put('/update/customers/:customer_id',update_customers)
router.put('/update/customers/address/:customer_id',update_customer_adress)
router.put('/update/customer/credit_card/:customer_id',auth,update_credit_card)


// tax data
const {tax_get_data,tax_data_byid}=require('../controller/tax')

router.get('/tax/data',tax_get_data)
router.get('/tax/dPUTata/:tax_id',tax_data_byid)


// get_shippings
const { get_shippings,shipping_get_by_id } = require('../controller/shippings')

router.get('/get/shippings',get_shippings)
router.get('/get/shippings/:shipping_region_id',shipping_get_by_id)


// orders
const {orders, Get_BYID_order_id, Get_dataIncustomer_BYID,Get_info_by_order_id}=require('../controller/order')

router.post('/create/orders',auth,orders)
router.get('/order/:order_id',auth,Get_BYID_order_id)
router.get('/orders/incustomer',auth,Get_dataIncustomer_BYID)
router.get('/order/shortDetail/:order_id',auth,Get_info_by_order_id)


// shopping_cart
const {get_generateUnique,shoppindcart_add,shopping_data,updatecartByItem,empty_cart,gettotal_amount_bycart,remove_product_from_cart}=require('../controller/shopping_cart')

router.get('/generateUniqueId',get_generateUnique)
router.post('/shoppingcart/add',shoppindcart_add)
router.get('/shoppingcart/getdata',shopping_data)
router.put('/update/shopping_cart/:item_id',updatecartByItem)
router.delete('/delete/shopping_cart/:cart_id',empty_cart)
router.get('/get/shopping_cart/:cart_id',gettotal_amount_bycart)
router.delete('/delete/product/:item_id',remove_product_from_cart)


module.exports=router