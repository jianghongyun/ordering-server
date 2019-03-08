// /**
//  * created by jianghy on 2019/02
//  * 用户操作
//  */
// const table = require('../models/tableModel');
// let responseData = {}
// const config = require('../config')

// /**
//  * 添加桌子
//  * @param {*} req 
//  * @param {*} res 
//  * @param {*} next 
//  */
// exports.addTable = (req, res, next) => {
//   const addData = req.body
//   table.create(addData).then( success => {
//     responseData = {
//       code: 0,
//       msg: '桌子添加成功'
//     }
//     res.json(responseData);
//   }).error(err => {
//     responseData = {
//       code: 0,
//       msg: '桌子添加失败'
//     }
//     res.json(responseData);
//     console.log(err)
//   })
// }

// /**
//  * 查询
//  * @param {} req 
//  * @param {*} res 
//  * @param {*} next 
//  */
// exports.tableList = (req, res, next) => {
//   table.findAll().then(success => {
//     responseData = {
//       code: 0,
//       msg: '查询成功',
//       data: success
//     }
//     res.json(responseData);
//   }).error(err => {
//     responseData = {
//       code: 1,
//       msg: '查询失败'
//     }
//     res.json(responseData);
//   })
// }

// /**
//  * 更新菜单
//  * @param {*} req 
//  * @param {*} res 
//  * @param {*} next 
//  */
// exports.updateTable = (req, res, next) => {
//   const id = req.body.id
//   const updateData = req.body
//   delete updateData.id
//   table.update(updateData,{
//     where: {
//       id: id
//     }
//   }).then( success => {
//     responseData = {
//       code: 0,
//       msg: '修改成功'
//     }
//     res.json(responseData);
//   }).error(err => {
//     responseData = {
//       code: 1,
//       msg: '修改失败'
//     }
//     res.json(responseData);
//     console.log(err)
//   })
// }

// /**
//  * 删除菜单
//  * @param {*} req 
//  * @param {*} res 
//  * @param {*} next 
//  */
// exports.deleteTable = (req, res, next) => {
//   const id = req.query.id
//   table.destroy({
//     where: {
//       id: id
//     }
//   }).then( success => {
//     responseData = {
//       code: 0,
//       msg: '删除成功'
//     }
//     res.json(responseData);
//   }).error(err => {
//     responseData = {
//       code: 1,
//       msg: '删除失败'
//     }
//     res.json(responseData);
//     console.log(err)
//   })
// }
