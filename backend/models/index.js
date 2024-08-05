const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  'Leave Management System',
  'postgres',
  'qwert@12',
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);

const db = {};

db.User = require('./user')(sequelize, DataTypes);
db.LeaveRequest = require('./leaveRequest')(sequelize, DataTypes);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db




