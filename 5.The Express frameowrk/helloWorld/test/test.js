//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
const chai = require('chai');
chai.use(require('chai-json'));
const expect = chai.expect;
let supertest = require('supertest');

///const jsonFile = 'op.json';

// This agent refers to PORT where program is runninng.
let rs = supertest.agent('http://localhost:3000');
let js = supertest.agent(`http://localhost:3000/json/op.json`);
let cs = supertest.agent('http://localhost:3000/calculate/*/2/3');
let results = supertest.agent('http://localhost:3000/results');


// UNIT test begin
describe('GET /', function() {
   it('respond with html', function(done) {
      rs.get('/').expect('Content-Type', /html/).expect(200, done);
   });
   it('respond with "1 + 2 = 3"', function(done) {
      rs.get('/').expect('Content-Type', /html/).expect(200).end((_, res) => {
         expect(res.text).to.contain('1 + 2 = 3');
         return done();
      });
   });
});

describe('GET /json/', () => {
      it(`/json/op.json returns correct results`, done => {
         let row1 = `<tr>\n            <td>10</td>\n            <td>+</td>\n            <td>12</td>\n            <td>22</td>\n        </tr>`;
         let row2 = `<tr>\n            <td>60</td>\n            <td>-</td>\n            <td>20</td>\n            <td>40</td>\n        </tr>`;
         let row3 =  `<tr>\n            <td>30</td>\n            <td>*</td>\n            <td>5</td>\n            <td>150</td>\n        </tr>`;
         let row4 =  `<tr>\n            <td>16</td>\n            <td>/</td>\n            <td>4</td>\n            <td>4</td>\n        </tr>`;
         js
         .get('/').expect('Content-Type', /html/).expect(200).end((_, res) => {
            expect(res.text).to.contain(row1);
            expect(res.text).to.contain(row2);
            expect(res.text).to.contain(row3);
            expect(res.text).to.contain(row4);
            return done();
         });
      });
      it(`op.json is a valid json file with expected content`, done => {
         let jObject = [
            {
               "x": 10,
               "y": 12,
               "operation": "+"
            },
            {
               "x": 60,
               "y": 20,
               "operation": "-"
            },
            {
               "x": 30,
               "y": 5,
               "operation": "*"
            },
            {
               "x": 16,
               "y": 4,
               "operation": "/"
            }
         ];           
         expect('op.json').to.be.a.jsonFile().and.to.be.jsonObj(jObject)
         .and.contain.jsonWithProps({"x": 10, "y": 12, "operation": "+"})
         .and.contain.jsonWithProps({"x": 60, "y": 20, "operation": "-"})
         .and.contain.jsonWithProps({"x": 30, "y": 5, "operation": "*"})
         .and.contain.jsonWithProps({"x": 16, "y": 4, "operation": "/"});
         done();
      });
});

describe('GET /calculate/', () => {
   it('/calculate/*/2/3 returns "2 * 3 = 6"', done => {
      cs.get('/').expect('Content-Type', /html/).expect(200).end((_, res) => {
         expect(res.text).to.contain('2 * 3 = 6');
         return done();
      });
   });
});

describe('GET /results', () => {
   it('/results contains correct results', done => {
      let row1 = `<tr>\n            <td>5</td>\n            <td>+</td>\n            <td>3</td>\n            <td>8</td>\n        </tr>`;
      let row2 = `<tr>\n            <td>5</td>\n            <td>+</td>\n            <td>80</td>\n            <td>85</td>\n        </tr>`;
      results
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((_, res) => {
         expect(res.text).to.contain(row1);
         expect(res.text).to.contain(row2);
         return done();
      });
   });
});