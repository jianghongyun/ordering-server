/**
 * created by jianghy on 2019/02
 * 用户操作
 */
const custom = require('../models/customModel');
const request = require("request")
let responseData = {}

const appid = 'wx70754773b55b3337'
const secret = '499b3ff6864048810d4d9007fd3489e9'
/**
 * 获取微信用户openId
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getOpenId = (req, res, next) => {
  const js_code = req.query.js_code
  const grant_type = 'authorization_code'
  let customData = {
    nickName: req.query.nickName,
    gender: req.query.gender
  }
  request('https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+js_code+'&grant_type='+grant_type,  (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const openid = JSON.parse(body).openid
      customData.openid = openid
      custom.findOrCreate({
        where: {
          openid: openid
        },
        defaults: customData
      }).then(success=>{
        responseData = {
          openid: openid,
          code: 0,
          msg: '获取成功'
        }
        res.json(responseData);
      }).error(err => {
        responseData = {
          code: 1,
          msg: '操作失败'
        }
        res.json(responseData);
        console.log(err)
      })
      
      
    } else {
      responseData = {
        code: 1,
        msg: '获取失败'
      }
      console.log(error)
      res.json(responseData);
    }
  })
}

/**
 * 获取微信token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getToken = (req, res, next) => {
  request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+'&secret='+secret, (error1, response1, body1) => {
    if (!error1 && response1.statusCode == 200) {
      console.log(JSON.parse(body1))
      responseData = {
        token: JSON.parse(body1).access_token,
        code: 0,
        msg: '获取成功'
      }
      res.json(responseData);
    } else {
      responseData = {
        code: 1,
        msg: '获取token失败'
      }
      console.log(error1)
      res.json(responseData);
    }
  })
}