const sequelize = require('sequelize');
const dbconn = require('../db/db');

const Order = dbconn.define('order', {
  id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
  openid: { type: sequelize.STRING, allowNull: false, comment: '用户微信id' },
  price: { type: sequelize.DECIMAL, allowNull: false, comment: '订单总价' },
  tableNum: { type: sequelize.STRING, allowNull: false, comment: '桌子号数' },
  orderNum: { type: sequelize.STRING, allowNull: false, comment: '订单号' },
  remark: { type: sequelize.STRING, allowNull: true, comment: '备注' },
  status: { type: sequelize.INTEGER, allowNull: false, defaultValue: 0, comment: '0:未打印, 1:已打印' },
  attr1: { type: sequelize.STRING, allowNull: true, comment: '预留' },
  attr2: { type: sequelize.STRING, allowNull: true, comment: '预留' }
}, {
  paranoid: true
});

module.exports = Order;

// ---------- 创建 Order 表 ----------
// Order.sync({ force: true }).then(() => {
//   console.log(`----- 创建 Order 表成功 -----`)
// }).catch((err) => {
//   console.error(`----- Order 表创建失败: ${err} -----`)
// })