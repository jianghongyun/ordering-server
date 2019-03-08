const Sequelize = require('sequelize');
const sequelize = new Sequelize('orderingsystem', 'root', '123456', {
  host: "localhost",
  port: 3306,
  dialect: 'mysql',
  pool: {
    max: 50, // 连接池中最大连接数量
    min: 0, // 连接池中最小连接数量
    idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
},
  timezone: '+08:00'

});

/**
 * 测试连接是否成功
 */
// sequelize.authenticate().then(function(err) {
//   console.log('Connection has been established successfully.');
// })
// .catch(function (err) {
//   console.log('Unable to connect to the database:', err);
// });

module.exports = sequelize;
