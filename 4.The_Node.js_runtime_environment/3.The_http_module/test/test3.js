//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8080");

// UNIT test begin
describe('GET /submit?name=a.text', function () {
      it('respond with "a.txt is file."', function (done) {
            server
                  .get('/submit?name=a.txt')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, "a.txt is file.\nfile content:\naaaa", done);
        });
    });

describe('GET /submit?name=coverage', function () {
      it('respond with "coverage is directory"', function (done) {
            server
                  .get('/submit?name=coverage')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, "coverage is directory.", done);
        });
    });

describe('GET /submit?name=coverage/int.txt', function () {
      it('respond with "coverage/int.txt is file.\nfile content:\nsesese"', function (done) {
            server
                  .get('/submit?name=coverage/int.txt')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, "coverage/int.txt is file.\nfile content:\nsesese", done);
        });
    });