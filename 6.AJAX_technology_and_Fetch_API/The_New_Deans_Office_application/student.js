const mongoose = require("mongoose");

var Student = new mongoose.Schema({
    name: String,
    password: String,
    courses: [ //for the many to many relationship with Course
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    grades: [] //for the one to many rel with Grade

});
var student = mongoose.model('student', Student);

module.exports = student;