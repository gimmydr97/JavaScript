//import the library sequelize
const { Sequelize} = require('sequelize');

//creation of db
const sequelize = new Sequelize('db','user','pass',{
    dialect: 'sqlite',
    host:'./dev.sqlite'
});
//export the created db
 module.exports = sequelize;
