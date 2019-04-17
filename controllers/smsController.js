/**
 * created by jianghy on 2019/03
 * 短信操作
 */
var https = require('https');
const request = require("request")
var qs = require('querystring');

exports.getCode = (request1, response, next) => {
  const mobile = request1.query.mobile
  const code = Math.floor((Math.random() * 10000) + 1)
  const apikey = '2e65f69cbef05889d56a6b7544458921';
  const text = '【云片网】您的验证码是' + code;
  const sms_host = 'sms.yunpian.com';
  const send_sms_uri = '/v2/sms/single_send.json';
  const post_data = {
    'apikey': apikey,
    'mobile': mobile,
    'text': text,
  };
  var content = qs.stringify(post_data);
  // post(send_sms_uri,content,sms_host);
  var options = {
    hostname: sms_host,
    port: 443,
    path: send_sms_uri,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  };
  var req = https.request(options, function (res) {
    // console.log('STATUS: ' + res.statusCode);  
    // console.log('HEADERS: ' + JSON.stringify(res.headers));  
    if (res.statusCode == 200) {
      const responseData = {
        code: 0,
        msg: '发送成功',
        sms: code
      }
      response.json(responseData);
    } else {
      const responseData = {
        code: 1,
        msg: '发送失败',
      }
      response.json(responseData);
    }
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });
  req.write(content);
  req.end();
}

/**
 * 发送请求
 * @param {*} uri 
 * @param {*} content 
 * @param {*} host 
 */
function post(uri, content, host) {
  var options = {
    hostname: host,
    port: 443,
    path: uri,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  };
  var req = https.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));  
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });
  //console.log(content);
  req.write(content);

  req.end();
}


