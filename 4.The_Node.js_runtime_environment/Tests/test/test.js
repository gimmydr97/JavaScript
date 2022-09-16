//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");
var fs  = require('fs');
var assert = require('assert');
// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8080");

// UNIT test begin
describe('GET /submit?', function () {
      it('respond with creation and display of question.html and creation of answere.pdf ', function (done) {
            server
                  .get('/submit?q1=io&q2=tu&q3=noi&a1=sono&a2=sei&a3=siamo')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, '<p>1.io</p>\n<p>2.tu</p>\n<p>3.noi</p>\n', done);

            
        });
    });
    
    
    