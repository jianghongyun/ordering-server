/**
 * created by jianghy on 2019/04
 * 财务操作
 */
const order = require('../models/orderModel')
const sequelize = require('sequelize')
let responseData = {}

/**
 * 当前年/月/日总收入
 * @param {*} dateformat 日期格式
 * @param {*} renameCol 命名年/月/日字段名称
 * @param {*} IncomeName 命名总收入名称
 * @param {*} currentDate 当前年/月/日
 */
function getIncome(dateformat, renameCol, IncomeName, currentDate) {
  return new Promise((resolve,reject) => {
    order.findAll({
      attributes:[
      [sequelize.fn('date_format', sequelize.col('createdAt'),dateformat), renameCol],
      [sequelize.fn('SUM', sequelize.col('price')), IncomeName],
    ],
    group: renameCol
    }).then(success => {
      success.map((obj,index,arr) => {
        if(obj.dataValues[renameCol] == currentDate) {
          resolve(obj)
        }
      })
    })
  })
}

/**
 * 年月汇总
 * @param {*} dateformat 日期格式
 * @param {*} currentDate 当前年月
 */
function getGroupIncome(dateformat,currentDate){
  return new Promise((resolve,reject) => {
    order.findAll({
      attributes:[
      [sequelize.fn('date_format', sequelize.col('createdAt'),dateformat), 'date'],
      [sequelize.fn('SUM', sequelize.col('price')), 'income'],
    ],
    group: 'date'
    }).then(success => {
      resolve(success)
    })
  })
}

/**
 * 当前年月日总收入
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.grossIncome = (req,res,next) => {  
  const yearly = timeformat().yearly
  const monthly = timeformat().monthly
  const daily = timeformat().daily
  
  let yearPromise = getIncome('%Y', 'yearly', 'yearlyIncome', yearly)
  let monthPromise = getIncome('%Y-%m', 'monthly', 'monthlyIncome', monthly)
  let dayPromise = getIncome('%Y-%m-%d', 'daily', 'dailyIncome', daily)
  Promise.all([yearPromise,monthPromise,dayPromise])
  .then(success => {
    let grossIncome = {
      yearly: success[0].dataValues.yearly,
      yearlyIncome: success[0].dataValues.yearlyIncome,
      monthly: success[1].dataValues.monthly,
      monthlyIncome: success[1].dataValues.monthlyIncome,
      daily: success[2].dataValues.daily,
      dailyIncome: success[2].dataValues.dailyIncome
    }    
    responseData = {
      code: 0,
      msg: '查询成功',
      grossIncome: grossIncome
    }
    res.json(responseData)
  })
  .catch(err => {
    responseData = {
      code: 1,
      msg: '查询失败',
    }
    res.json(responseData)
    console.log(err)
  })
  
}

/**
 * 月收入
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.monthlyIncome = (req,res,next) => {
  const monthly = timeformat().monthly
  const yearly = timeformat().yearly
  order.findAll({
    attributes:[
      [sequelize.fn('date_format', sequelize.col('createdAt'),'%Y-%m'), 'date'],
      [sequelize.fn('SUM', sequelize.col('price')), 'income'],
    ],
    group: 'date',
    where: {
      'createdAt': {
        '$gte': yearly+'-01-01 00:00:00',
      }
    }
  })
  .then(success => {
    responseData = {
      code: 0,
      msg: '查询成功',
      monthlyIncome: success
    }
    res.json(responseData)
  })
  .catch(err => {
    responseData = {
      code: 1,
      msg: '查询失败',
    }
    res.json(responseData)
    console.log(err)
  })
}

/**
 * 年收入
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.yearlyIncome = (req,res,next) => {
  const yearly = timeformat().yearly
  order.findAll({
    attributes:[
      [sequelize.fn('date_format', sequelize.col('createdAt'),'%Y'), 'date'],
      [sequelize.fn('SUM', sequelize.col('price')), 'income'],
    ],
    group: 'date',
  })
  .then(success => {
    responseData = {
      code: 0,
      msg: '查询成功',
      yearlyIncome: success
    }
    res.json(responseData)
  })
  .catch(err => {
    responseData = {
      code: 1,
      msg: '查询失败',
    }
    res.json(responseData)
    console.log(err)
  })
}

/**
 * 时间格式
 */
function timeformat(){
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1) < 10 ? '0'+(date.getMonth() + 1) : (date.getMonth() + 1)
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const monthly = year + '-' + month
  const daily = year+'-'+month+'-'+day
  return { yearly: year, monthly: monthly, daily: daily }
}
