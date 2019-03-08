/**
 * created by jianghy on 2018/10
 * 后台api路由
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const menuClassController = require('../controllers/menuClassController')
const menuController = require('../controllers/menuController')
const tableController = require('../controllers/tableController')
const weChatController = require('../controllers/weChatController')
const orderController =  require('../controllers/orderController')

router.post('/user/login', userController.login);

/**
 * 后台接口
 */
router.post('/admin/menuClass/add', menuClassController.addMenuClass);
router.get('/admin/menuClass/list', menuClassController.menuClassList);
router.get('/admin/menuClass/alllist', menuClassController.menuClassAllList);
router.put('/admin/menuClass/update', menuClassController.updateMenuClass);
router.get('/admin/menuClass/delete', menuClassController.deleteMenuClass);

router.post('/admin/menu/add', menuController.addMenu);
router.get('/admin/menu/list', menuController.menuList);
router.put('/admin/menu/update', menuController.updateMenu);
router.get('/admin/menu/delete', menuController.deleteMenu);
router.post('/admin/menu/uploadImg', menuController.uploadImg);

router.get('/admin/order/list', orderController.orderList);
router.get('/admin/order/detail', orderController.orderDetail);
router.get('/admin/order/delete', orderController.deleteOrder);
router.get('/admin/order/update', orderController.updateOrder);

// router.post('/admin/table/add', tableController.addTable);
// router.get('/admin/table/list', tableController.tableList);
// router.put('/admin/table/update', tableController.updateTable);
// router.get('/admin/table/delete', tableController.deleteTable);

/**
 * 小程序
 */
router.get('/weChat/getOpenId', weChatController.getOpenId);
router.get('/weChat/getToken', weChatController.getToken);
router.get('/weChat/menuClass/alllist', menuClassController.menuClassAllList);
router.get('/weChat/menu/list', menuController.menuStyleList);
router.get('/weChat/menu/detail', menuController.menuDetail);

router.post('/weChat/order/add', orderController.addOrder)
router.get('/weChat/order/list', orderController.orderPersonList)
router.get('/weChat/order/detail', orderController.orderDetail)

router.get('/weChat/custom/info', userController.getCustom)
router.put('/weChat/custom/update', userController.updateCustom)

module.exports = router;