const sequelize = require('sequelize');
const dbconn = require('../db/db');

const MenuClass = dbconn.define('menuClass', {
  id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
  menuClassName: { type: sequelize.STRING, allowNull: false, comment: '菜单分类名称' },
  attr1: { type: sequelize.STRING, allowNull: true, comment: '预留' },
  attr2: { type: sequelize.STRING, allowNull: true, comment: '预留' }
}, {
  paranoid: true
});

module.exports = MenuClass;

// ---------- 创建 MenuClass 表 ----------
// MenuClass.sync({ force: true }).then(() => {
//   console.log(`----- 创建 MenuClass 表成功 -----`)
// }).catch((err) => {
//   console.error(`----- MenuClass 表创建失败: ${err} -----`)
// })