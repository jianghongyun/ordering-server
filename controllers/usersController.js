/**
 * created by jianghy on 2019/02
 * 用户操作
 */
const express = require('express');
const user = require('../models/usersModel');
const jwt = require('jsonwebtoken');  //用来生成token

const custom = require('../models/customModel')

let responseData = {};

/**
 * 用户登陆
 * code[0-4] 0:登陆成功，1:用户名或密码为空，2:户名或密码不正确
 */
exports.login = (req, res, next) => {
  var data = req.body;
  var loginData = {
    username: data.username,
    password: data.password
  }
  if (data.username == ''|| data.password == '') {
    responseData = {
      code: 1,
      msg: '用户名或密码不能为空'
    }
    res.json(responseData);
    return;
  }

  user.findOne({
    where: {
      username: loginData.username,
      password: loginData.password
    }
  }).then((success) => {
    if (!success) {
      responseData = {
        code: 2,
        msg: '用户名或密码不正确'
      }
      res.json(responseData);
      return;
    } else {
      responseData.code = 0;
      responseData.msg = "登陆成功";
      //设置tolen
      let secretOrPrivateKey="jwt";// 这是加密的key（密钥）
      let token = jwt.sign({ username: success.username, password: success.password }, secretOrPrivateKey, {
          expiresIn: 60*60*24  // 24小时过期
      });
      responseData.token = token
      res.json(responseData);
    }
  })
}

/**
 * 查询顾客资料
 */
exports.getCustom = (req, res, next) => {
  const openid = req.query.openid
  custom.findOne({
    where: {
      openid: openid
    }
  })
  .then(success => {
    responseData = {
      code: 0,
      msg: '查询成功',
      info: success
    }
    res.json(responseData);
  })
  .error(err => {
    console.log(err)
    responseData = {
      code: 0,
      msg: '查询失败'
    }
    res.json(responseData);
  })
}

/**
 * 更新顾客资料
 */
exports.updateCustom = (req, res, next) => {
  const openid = req.body.openid
  const data = {
    attr1: req.body.name,
    attr2: req.body.phone,
    gender: req.body.gender
  }
  
  custom.update(data, {
    where: {
      openid: openid
    }
  })
  .then(success => {
    responseData = {
      code: 0,
      msg: '修改成功',
    }
    res.json(responseData);
  })
  .error(err => {
    console.log(err)
    responseData = {
      code: 0,
      msg: '查询失败'
    }
    res.json(responseData);
  })
}

