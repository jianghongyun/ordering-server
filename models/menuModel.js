const sequelize = require('sequelize');
const dbconn = require('../db/db');

const Menu = dbconn.define('menu', {
  id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
  menuClassId: { type: sequelize.INTEGER, allowNull: false, comment: '菜单分类id' },
  menuClassName: { type: sequelize.STRING, allowNull: false, comment: '菜单分类名称' },
  menuName: { type: sequelize.STRING, allowNull: false, comment: '菜单名称' },
  price: { type: sequelize.DECIMAL, allowNull: false, comment: '单价' },
  menuImg: { type: sequelize.STRING, allowNull: false, comment: '菜单图片' },
  saleNum: { type: sequelize.INTEGER, allowNull: false, defaultValue: 0, comment: '销售量' },
  introduce: { type: sequelize.STRING, allowNull: true, comment: '介绍' },
  isRecommend: { type: sequelize.ENUM('0' ,'1'), allowNull: false, defaultValue: '0', comment: '是否推荐 0:否, 1:是' },
  attr1: { type: sequelize.STRING, allowNull: true, comment: '预留' },
  attr2: { type: sequelize.STRING, allowNull: true, comment: '预留' }
}, {
  paranoid: true
});

module.exports = Menu;

// ---------- 创建 MenuClass 表 ----------
// Menu.sync({ force: true }).then(() => {
//   console.log(`----- 创建 Menu 表成功 -----`)
// }).catch((err) => {
//   console.error(`----- Menu 表创建失败: ${err} -----`)
// })