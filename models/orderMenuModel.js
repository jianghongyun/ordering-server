const sequelize = require('sequelize');
const dbconn = require('../db/db');

const OrderMenu = dbconn.define('ordermenu', {
  id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
  orderid: { type: sequelize.INTEGER, allowNull: false, comment: '订单id' },
  menuid: { type: sequelize.INTEGER, allowNull: false, comment: '菜单id' },
  // menuName: { type: sequelize.STRING, allowNull: false, comment: '菜单名称' },
  // price: { type: sequelize.DECIMAL, allowNull: false, comment: '单价' },
  menuNum: { type: sequelize.INTEGER, allowNull: false, comment: '数量' },
  attr1: { type: sequelize.STRING, allowNull: true, comment: '预留' },
  attr2: { type: sequelize.STRING, allowNull: true, comment: '预留' }
}, {
  paranoid: true
});

module.exports = OrderMenu;

// ---------- 创建 OrderMenu 表 ----------
// OrderMenu.sync({ force: true }).then(() => {
//   console.log(`----- 创建 OrderMenu 表成功 -----`)
// }).catch((err) => {
//   console.error(`----- OrderMenu 表创建失败: ${err} -----`)
// })