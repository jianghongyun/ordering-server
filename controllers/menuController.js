/**
 * created by jianghy on 2019/02
 * 用户操作
 */
const formidable = require('formidable')
const fs = require('fs')
const menu = require('../models/menuModel');
let responseData = {}
const config = require('../config')

/**
 * 添加菜单
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.addMenu = (req, res, next) => {
  const addData = req.body
  menu.create(addData).then( success => {
    responseData = {
      code: 0,
      msg: '菜单分类添加成功'
    }
    res.json(responseData);
  }).error(err => {
    responseData = {
      code: 0,
      msg: '菜单分类添加失败'
    }
    res.json(responseData);
    console.log(err)
  })
}

/**
 * 分页查询
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.menuList = (req, res, next) => {
  const page = Number(req.query.page) 
  const pageSize = Number(req.query.pageSize)
  const where = req.query
  delete where.page
  delete where.pageSize
  menu.findAndCountAll({
    offset: (page - 1) * pageSize,//开始的数据索引，比如当page=2 时offset=10 ，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目
    limit: pageSize,
    where
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
 * 查询所有
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.menuStyleList = (req, res, next) => {
  menu.findAll().then(success => {
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
 * 查询详情
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.menuDetail = (req, res, next) => {
  const id = Number(req.query.id) 
  menu.findById(id).then(success => {
    responseData = {
      code: 0,
      msg: '查询成功',
      menuDetail: success
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
 * 更新菜单
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateMenu = (req, res, next) => {
  // if (req.body.menuClassName == '') {
  //   responseData = {
  //     code: 1,
  //     msg: '菜单分类名称不能为空'
  //   }
  //   res.json(responseData);
  //   return;
  // }
  const id = req.body.id
  const updateData = req.body
  delete updateData.id
  menu.update(updateData,{
    where: {
      id: id
    }
  }).then( success => {
    responseData = {
      code: 0,
      msg: '菜单分类修改成功'
    }
    res.json(responseData);
  }).error(err => {
    responseData = {
      code: 1,
      msg: '查询失败'
    }
    res.json(responseData);
    console.log(err)
  })
}

/**
 * 删除菜单
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteMenu = (req, res, next) => {
  const id = req.query.id
  menu.destroy({
    where: {
      id: id
    }
  }).then( success => {
    responseData = {
      code: 0,
      msg: '菜单分类删除成功'
    }
    res.json(responseData);
  }).error(err => {
    responseData = {
      code: 1,
      msg: '删除失败'
    }
    res.json(responseData);
    console.log(err)
  })
}

/**
 * 上传菜单图片
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.uploadImg = (req, res, next) => {
  const AVATAR_UPLOAD_FOLDER = '/menuImg/';

  //创建上传表单
  var form = new formidable.IncomingForm();
 
  //设置编辑
  form.encoding = 'utf-8';

  //设置上传目录
  form.uploadDir = 'uploadImg' + AVATAR_UPLOAD_FOLDER;

  //保留后缀
  form.keepExtensions = true;

  //文件大小 2M
  form.maxFieldsSize = 2 * 1024 * 1024;

  // 上传文件的入口文件
  form.parse(req, (err, fields, files) => {    
      if (err) {
          // res.locals.error = err;
          responseData = {
            code: 1,
            msg: '上传失败'
          }
          res.json(responseData);
          return;
      }
      
      var extName = 'jpg';  //后缀名
      switch (files.file.type) {
          case 'image/pjpeg':
              extName = 'jpg';
              break;
          case 'image/jpeg':
              extName = 'jpg';
              break;         
          case 'image/png':
              extName = 'png';
              break;
          case 'image/x-png':
              extName = 'png';
              break;         
      }

      if(extName.length == 0) {
          // res.locals.error = '只支持png和jpg格式图片';
          // res.render('index', { title: TITLE });
          responseData = {
            code: 1,
            msg: '只支持png和jpg格式图片'
          }
          res.json(responseData);
          return;                   
      }

      var avatarName = Math.random() + '.' + extName;
      var newPath = form.uploadDir + avatarName;
      fs.renameSync(files.file.path, newPath);  //重命名
      responseData = {
        code: 0,
        msg: '上传成功',
        // imgUrl: newPath
        imgUrl: 'http://' + config.host + ':' + config.port + '/' + newPath
      }
      res.json(responseData);
  });

  // res.locals.success = '上传成功';
  // res.render('index', { title: TITLE });
  
}