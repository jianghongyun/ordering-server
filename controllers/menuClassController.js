/**
 * created by jianghy on 2019/02
 * 用户操作
 */
const menuClass = require('../models/menuClassModel');
let responseData

/**
 * 添加菜单分类
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.addMenuClass = (req, res, next) => {
  if (req.body.menuClassName == '') {
    responseData = {
      code: 1,
      msg: '菜单分类名称不能为空'
    }
    res.json(responseData);
    return;
  }
  const addData = req.body
  menuClass.create(addData).then( success => {
    responseData = {
      code: 0,
      msg: '菜单分类添加成功'
    }
    res.json(responseData);
  }).error(err => {
    console.log(err)
  })
}

/**
 * 分页查询
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.menuClassList = (req, res, next) => {
  const page = Number(req.query.page) 
  const pageSize = Number(req.query.pageSize)
  menuClass.findAndCountAll({
    offset: (page - 1) * pageSize,//开始的数据索引，比如当page=2 时offset=10 ，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目
    limit: pageSize
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
 * 查询全部
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.menuClassAllList = (req, res, next) => {
  menuClass.findAll().then(success => {
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
 * 更新菜单分类
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateMenuClass = (req, res, next) => {
  if (req.body.menuClassName == '') {
    responseData = {
      code: 1,
      msg: '菜单分类名称不能为空'
    }
    res.json(responseData);
    return;
  }
  const id = req.body.id
  const updateData = req.body
  delete updateData.id
  menuClass.update(updateData,{
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
 * 删除菜单分类
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteMenuClass = (req, res, next) => {
  const id = req.query.id
  menuClass.destroy({
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