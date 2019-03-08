/**
 * created by jianghy on 2019/03
 * 用户操作
 */
const sequelize = require('sequelize');
const dbconn = require('../db/db');
const order = require('../models/orderModel')
const orderMenu = require('../models/orderMenuModel')
const menu = require('../models/menuModel')
let responseData = {}

/**
 * 添加订单
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.addOrder = (req, res, next) => {
  const time = new Date().getTime()
  const orderData = {
    openid: req.body.openid,
    price: req.body.price,
    tableNum: req.body.tableNum,
    orderNum: time + req.body.tableNum,
    remark: req.body.remark
  }
  const orderArr = req.body.orderArr
  
  // 创建事务
  dbconn.transaction(function(t){
    // 在事务中执行操作
    return order.create(orderData, {transaction:t})
    .then(function(order){
      orderArr.map((obj,index,arr) => {
        obj.orderid = order.id
      })
      return orderMenu.bulkCreate(orderArr, {transaction:t})
    });
  }).then(function (results){
    /* 操作成功，事务会自动提交 */
    responseData = {
      code: 0,
      msg: '提交成功',
      orderNum: orderData.orderNum,
      time: time
    }
    res.json(responseData)
  }).catch(function(err){
    /* 操作失败，事件会自动回滚 */
    console.log(err)
    responseData = {
      code: 1,
      msg: '提交失败'
    }
    res.json(responseData)
  }); 
}

/**
 * 查询个人订单
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.orderPersonList = (req, res, next) => {
  order.findAll({
    where: {
      openid: req.query.openid
    },
    'order': [
      ["createdAt", "DESC"]
    ]
  }).then(success => {
    responseData = {
      code: 0,
      msg: '查询成功',
      rows: success
    }
    res.json(responseData)
  }).error(err => {
    responseData = {
      code: 1,
      msg: '查询失败',
    }
    res.json(responseData)
    console.log(err)
  })
}

/**
 * 订单详情
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.orderDetail = (req, res, next) => {
  menu.hasMany(orderMenu,{targetKey: 'menuid' });
  order.hasMany(orderMenu,{ targetKey: 'orderid' });
  let result = {}
  order.findOne({
    where: {
      id: req.query.id
    }
  }).then(order => {
    result.order = order
    menu.findAll({
      include: [
        {
          model: orderMenu,
          where: {
            orderid: req.query.id
          }
        }
      ]
    }).then(success => {
      let list = []
      success.map((obj, index, arr) => {
        list.push({
          menuName: obj.menuName,
          price: obj.price,
          menuNum: obj.ordermenus[0].menuNum
        })
      })
      result.list = list
      responseData = {
        code: 0,
        msg: '查询成功',
        result: result
      }
      res.json(responseData)
    }).error(err => {
      console.log(err)
      responseData = {
        code: 1,
        msg: '查询失败',
      }
      res.json(responseData)
    })
  }).error(err => {
    console.log(err)
    responseData = {
      code: 1,
      msg: '查询失败',
    }
    res.json(responseData)
  })

}

/**
 * 分页查询
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.orderList = (req, res, next) => {
  const page = Number(req.query.page) 
  const pageSize = Number(req.query.pageSize)
  let where = {}
  if ('startTime' in req.query && 'endTime' in req.query) {
    const startTime = req.query.startTime
    const endTime = req.query.endTime
    where = req.query
    delete where.startTime;
    delete where.endTime;
    where.createdAt = {
      $gte: startTime,
      $lte: endTime
    }
  } 
  else if ('startTime' in req.query && !('endTime' in req.query)) {
    const startTime = req.query.startTime
    where = req.query
    delete where.startTime;
    where.createdAt = {
      $gte: startTime
    }
  }
  else if (!('startTime' in req.query) && 'endTime' in req.query) {
    const endTime = req.query.endTime
    where = req.query
    delete where.endTime;
    where.createdAt = {
      $lte: endTime
    }
  } 
  else {
    where = req.query
  } 
  delete where.page
  delete where.pageSize
  order.findAndCountAll({
    offset: (page - 1) * pageSize,//开始的数据索引，比如当page=2 时offset=10 ，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目
    limit: pageSize,
    where,
    'order': [
      ["status", "ASC"],
      ["createdAt", "DESC"]
    ]
  }).then(success => {
    responseData = {
      code: 0,
      msg: '查询成功',
      data: success
    }
    res.json(responseData);
  }).error(err => {
    responseData = {
      code: 1,
      msg: '查询失败'
    }
    res.json(responseData);
  })
}

/**
 * 删除订单
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteOrder = (req, res, next) => {
  const id = req.query.id
  order.destroy({
    where: {
      id: id
    }
  })
  .then( success => {
    responseData = {
      code: 0,
      msg: '删除成功'
    }
    res.json(responseData);
  })
  .error(err => {
    responseData = {
      code: 1,
      msg: '删除失败'
    }
    res.json(responseData);
    console.log(err)
  })
}

/**
 * 订单状态更改
 */
exports.updateOrder = (req, res, next) => {
  const id = req.query.id
  order.update({status: 1}, {
    where: {
      id: id
    }
  })
  .then(success => {
    responseData = {
      code: 0,
      msg: '更改成功'
    }
    res.json(responseData);
  })
  .error(err => {
    responseData = {
      code: 1,
      msg: '更改失败'
    }
    res.json(responseData);
    console.log(err)
  })
}