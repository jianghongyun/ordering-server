/**
 * created by jianghy on 2018/10
 * 应用程序的启动文件
 */

//加载express模块
const express = require('express');
//加载body-Parser中间件
const bodyParser = require('body-parser');
const app = new express();
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jwt = require('jsonwebtoken')
const config = require('./config')
/**
 * 开发阶段
 */
app.use("/", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
});

app.use(express.static(__dirname));

app.use('/admin', (req, res, next) =>{
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, 'jwt', (err, decode)=> {
      if (err) {  //  时间失效的时候 || 伪造的token
          res.send({'code':2, 'msg': '登陆已过期'})
      } 
      else {
          next()
      }
    })
  } else {
    res.send({'code':3, 'msg': '请登陆'})
  }
})

app.use('/', jsonParser, require('./routers/apiRouter'));

const server = app.listen(config.port, config.host, () => {  
    const host = server.address().address;  
    const port = server.address().port;   
    console.log('Example app listening at http://%s:%s', host, port);
});