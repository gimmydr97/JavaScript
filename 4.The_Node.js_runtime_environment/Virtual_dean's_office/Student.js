//this are the class for the student table
const { Model, DataTypes, Sequelize } = require('sequelize');
//import the created db
const sequelize = require('./db');
class Student extends Model{}

//inizialization of student table
//i don't include a column for primary kay because sequelize spon it automaticly
Student.init({

    name:{
        type: DataTypes.STRING
    },
    surname:{
        type: DataTypes.STRING
    },
    data: {
        type: Sequelize.BLOB('long')
      }
},{
    sequelize,
    modelName: 'student',
    timestamps: false
})


//export it
module.exports = Student;

