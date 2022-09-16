//this are the class for the grade table
const { Model, DataTypes } = require('sequelize');
//import the created db
const sequelize = require('./db');
class Grade extends Model{}

//inizialization of grade table
//i don't include a column for primary kay because sequelize spon it automaticly
Grade.init({
    
    subject:{
        type: DataTypes.STRING
    },
    n_value:{
        type: DataTypes.NUMBER
    }
    
},{
    sequelize,
    modelName: 'grade',
    timestamps: false
})

//export it
module.exports = Grade;