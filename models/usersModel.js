const sequelize = require('sequelize');
const dbconn = require('../db/db');

const User = dbconn.define('user', {
  userid: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
  username: { type: sequelize.STRING, allowNull: false, comment: '登录名' },
  password: { type: sequelize.STRING, allowNull: false, comment: '密码' },
  isAdmin: { type: sequelize.ENUM('0' ,'1'), allowNull: false, defaultValue: '0', comment: '是否管理员 0:否, 1:是' },
}, {
  paranoid: true
});

module.exports = User;

// ---------- 创建 User 表 ----------
// User.sync({ force: true }).then(() => {
//   console.log(`----- 创建 User 表成功 -----`)
// }).catch((err) => {
//   console.error(`----- User 表创建失败: ${err} -----`)
// })