
//import of formidable library for creation of the server
var formidable = require('formidable'),
    http = require('http'),
//imoprt the created db
sequelize = require('./db');
//and the class of the table
const Student = require('./Student');
const Grade = require('./Grade');


//create the db
///*{force: true}*/ this is for cancel the table every time that the server is reinizialized
sequelize.sync({force: true}).then(() => console.log('db is ready'));

//creation of the one at many relationship between Student and Grade
Student.hasMany(Grade, {
  onDelete: "cascade"
});
Grade.belongsTo(Student, {
  foreignKey: {
      allowNull: false
  }
});

//this is the server
http.createServer(function(req, res) {
  //this if is for insert one student in the db
  if (req.url == '/post' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
      
      var fs = require('fs');
      var imageData = fs.readFileSync(fields.photo);

      //insertion of the student in the students table
      Student.create({name: fields.name, surname: fields.surname, data: imageData}).then(() => {
      });
      fs.writeFileSync('./Photo.txt', imageData);
      res.write(`Student ${fields.name},${fields.surname} is inserted`, function(err) { res.end(); });
    });
    return;
    
  }
  //this if is for get the list of student in the db
  else if(req.url == '/get?' && req.method.toLowerCase() == 'get'){
    var form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields) {
      //this get all the student in the db
      const students = await Student.findAll();
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('Students:\n\n');
      //this for write the list of students
      for(var i = 0; i <students.length; i++){
        
        res.write(students[i].dataValues.id.toString()+". ");
        res.write(students[i].dataValues.name+" ");
        res.write(students[i].dataValues.surname + "\n");
        //put logic for photo
      }
      
      res.end();
    });
    return;
  }
  //this if is for update the data of one student
  else if(req.url == '/put' && req.method.toLowerCase() == 'post'){
    var form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields){
      //take the inserted id
      const requestId = fields.id;
      //find the student with this id
      const student = await Student.findOne({where: {id: requestId}});
      //change his fields
      student.name = fields.name;
      student.surname = fields.surname;
      //save the changes
      await student.save();
    });
    return;
  }
  //this if is for delete one student 
  else if(req.url == '/delete' && req.method.toLowerCase() == 'post'){
    var form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields){
      //take his id from the request
      const requestId = fields.id;
      //destroy his row from the db
      //(the relationshis are created in manner that if you delate a student also his grades are delated)
      await Student.destroy({where: {id: requestId}});
    });
    return;
  }
  //this is for insert one grade for one student 
  else if(req.url == '/postGrades' && req.method.toLowerCase() == 'post'){
    var form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields){
      const requestId = fields.id;
      //retrive the student that hat the inserted id
      const student = await Student.findOne({where: {id: requestId}});
      if(student !== null)
        //creation of the grade for this student
        Grade.create({
          subject: fields.subject,
          n_value: fields.grade,
          studentId: requestId
        }).then(() => { res.end();});  
    });
    return;
  }
  //this is for the the grades of one student
  else if(req.url == `/getGrades` && req.method.toLowerCase() == 'post'){
    var form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields){
      const requestId = fields.id;
      const student = await Student.findOne({where: {id: requestId}});
      if(student !== null){
        Student.findByPk(requestId, { include: ["grades"] });
        //this return the grades of the student
        const grades = await Student.findAll({ include: ["grades"] }); 
        //in this for i write the grades on the page
        for(var i= 0; i< grades[requestId-1].dataValues.grades.length; i++){
          raw = grades[requestId-1].dataValues.grades[i].dataValues;
          console
          res.write(raw.id.toString()+" ");
          res.write(raw.subject+" ");
          res.write(raw.n_value.toString() + "\n");
        }
        res.end();
      }
    });
    return;
  }


  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  //this are the various form for the requests
  res.end(
    'Insert a student'+
    '<form action="/post" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="name" value="name"><br>'+
    '<input type="text" name="surname" value="surname"><br>'+
    '<input type="text" name="photo" value="./stud.jpg"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'+
    'List of student'+
    '<form action="/get" enctype="multipart/form-data" method="get">'+
    '<input type="submit" value="GetStudents">'+
    '</form>'+
    'Update a student'+
    '<form action="/put" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="id" value="id"><br>'+
    '<input type="text" name="name" value="name"><br>'+
    '<input type="text" name="surname" value="surname"><br>'+
    '<input type="submit" value="Update">'+
    '</form>'+
    'Delete a student'+
    '<form action="/delete" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="id" value="id"><br>'+
    '<input type="text" name="name" value="name"><br>'+
    '<input type="text" name="surname" value="surname"><br>'+
    '<input type="submit" value="Delete">'+
    '</form>'+
    'Add a grade for one student'+
    '<form action="/postGrades" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="id" value="id"><br>'+
    '<input type="text" name="subject" value="subject"><br>'+
    '<input type="number" name="grade" value="grade"><br>'+
    '<input type="submit" value="AddGrade">'+
    '</form>'+
    'Get grades of one student'+
    '<form action="/getGrades" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="id" value="id"><br>'+
    '<input type="submit" value="GetGrades">'+
    '</form>'
  );
}).listen(8080);


