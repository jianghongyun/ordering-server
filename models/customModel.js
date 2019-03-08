const sequelize = require('sequelize');
const dbconn = require('../db/db');

const Custom = dbconn.define('custom', {
  id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
  openid: { type: sequelize.STRING, unique: true, comment: 'openid' },
  nickName: { type: sequelize.STRING, allowNull: false, comment: '微信昵称' },
  gender: { type: sequelize.INTEGER, defaultValue: 1, allowNull: false, comment: '性别 1:男, 2:女' },
  attr1: { type: sequelize.STRING, allowNull: true, comment: '预留' },
  attr2: { type: sequelize.STRING, allowNull: true, comment: '预留' }
}, {
  paranoid: true
});

module.exports = Custom;

// ---------- 创建 Custom 表 ----------
// Custom.sync({ force: true }).then(() => {
//   console.log(`----- 创建 Custom 表成功 -----`)
// }).catch((err) => {
//   console.error(`----- Custom 表创建失败: ${err} -----`)
// })