//in views folder there are various style in ejs format for the various express request
var express = require('express'); 
var faker = require('faker'); //for create random identity
var mongoose = require('mongoose'); //for connection at mongoDB

mongoose.connect('mongodb://localhost:27017/');
//creation of the student, course and grade schemas
var Schema = mongoose.Schema;

var Student = new Schema({
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

var  Course= new Schema({
    name: String,
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    ],
    grades: [
      {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Grade"
      }
    ]

});
var course = mongoose.model('course', Course);

var  Grade = new Schema({
    vote: Number,
    
});
var grade = mongoose.model('grade', Grade);

const app = express();

app.set('view-engine', 'ejs');    
app.use(express.urlencoded({extended: false}));


app.get('/login', function (req, res) {     
    res.render(`login.ejs`);
});

app.post('/login', function (req, res) {  
    var name = req.body.name;   
    var pass = req.body.password;
    student.findOne({name: name, password: pass }, function (err,stud) {
      res.render("list.ejs", {name:stud.name, id: stud._id});
    });
});

app.post("/votes",function(req,res){
  student.findById(req.body.button, function(err,stud) {
    var str =  `${req.body.course} votes:` ;
  
    for(var i=0; i< stud.courses.length; i++){

      course.findById(stud.courses[i]._id, function (err, c) {  
          if(c.name == req.body.course){
            for(var j= 0 ; j< stud.grades.length; j++){
                if(c.grades.includes(stud.grades[j]._id)){
                  str = str + " " + stud.grades[j].vote + ", ";
                }
            }
            res.render("subl.ejs",{voti: str.substring(0,str.length-2)});
          }
      });
    }
  });
});

app.get('/register', function (req, res) {     
    res.render(`register.ejs`);
});

app.post('/register', function (req, res) {     
    
    var item = {
        name: req.body.name,
        password: req.body.password
    };

    var data = new student(item);
    data.save();
    res.redirect("/login");
    
});
app.listen(3000);

//fun for popolate the DB
const createStudent = function(stud) {
    return student.create(stud).then(docStudent => {
      return docStudent;
    });
}
  
  const createCourse = function(c) {
    return course.create(c).then(docCourse => {
      return docCourse;
    });
}
  
  const createGrade = function(g){
    return grade.create(g).then(docGrade =>{
      return docGrade;
    });
}
//fun for insert the various relationship
  const addCourseToStudent = function(studentId, c) {
    return student.findByIdAndUpdate(
      studentId,
      { $push: { courses: c._id } },
      { new: true, useFindAndModify: false }
    );
}
  
  const addStudentToCourse = function(courseId, stud) {
    return course.findByIdAndUpdate(
      courseId,
      { $push: { students: stud._id } },
      { new: true, useFindAndModify: false }
    );
}

  const AddGradeToStudent = function(StudentId, g) {
    return student.findByIdAndUpdate(
      StudentId,
      { $push: { 
          grades: {
            _id : g._id ,
            vote: g.vote
          }
        }
      },
      { new: true, useFindAndModify: false }
    );
}

const AddGradeToCourse = function(CourseId, g) { 
    return course.findByIdAndUpdate(
      CourseId,
      { $push: { grades: g._id } },
      { new: true, useFindAndModify: false }
    );
}
//fun for create the students, course and grades identity
const sponeStudents = async function() {
  var studs = [];
    for(var i = 0 ; i < 5; i++){
      var stud = await createStudent({
        name: faker.name.findName(),
        password: faker.internet.password()
      });
      studs.push(stud);
    }
    return studs;   
}

const sponeCourses = async function() {
  var c=[];
    var c1 = await createCourse({ name: "story"});
    var c2 = await createCourse({ name: "mathematica"});
    var c3 = await createCourse({ name: "science"});
    var c4 = await createCourse({ name: "english"}); 
    var c5 = await createCourse({ name: "low"}); 
    var c6 = await createCourse({ name: "computer science"});
    var c7 = await createCourse({ name: "physics"});
    c.push(c1,c2,c3,c4,c5,c6,c7);
    return c;
}

const sponeGrade = async function(){
  var gs = [];
  for(var i = 0; i < 3; i++){
    var g = await createGrade({vote:Math.round(Math.random()*10)});
    gs.push(g);
  }
  return gs;
}

//fun that popolate the db
const AddRelations = async function() {
    
    var studs = await sponeStudents();
    var c = await sponeCourses();
    
    for(var i=0;i<5;i++){
      for(var j =0; j < 7; j++){
        await addCourseToStudent(studs[i]._id, c[j]);
        await addStudentToCourse(c[j]._id, studs[i]);
        var g = await sponeGrade();
        for(y=0; y < 3; y++){
          await AddGradeToStudent(studs[i]._id, g[y]);
          await AddGradeToCourse(c[j]._id, g[y]);
        }
        
      }
      
    }
  
}
//fun fur delete the the elements in db
const Delete = async function(){
  
  student.deleteMany({ }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
  course.deleteMany({ }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
  grade.deleteMany({ }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
}
//if you wonts reinizialize the db use this sequenze of commands
//Delete();
//AddRelations();
