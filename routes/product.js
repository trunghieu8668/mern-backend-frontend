const express = require('express');
const router = express.Router();

const { create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, photo, listSearch } = require('../controler/product');
const { requireSignin, isAuth, isAdmin } = require('../controler/auth');
const { userById } = require('../controler/user');


router.get('/product/:productId', read);

router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove)
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update)
router.get('/products', list)
router.get('/products/related/:productId', listRelated)
router.get('/productgroupbyproduct', listCategories)
router.post('/products/by/search', listBySearch)
router.get('/product/photo/:productId', photo)
router.get('/products/search', listSearch)
// PARAM
router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
