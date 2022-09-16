import {trova} from '../script.mjs';
import assert from 'assert';

describe('The search() method', function () {
  it('salecasadi for casa.txt', function () {
    assert.strictEqual(trova(".","casa.txt"), "salecasadi")
  });

  it('the string entered is a directory for coverage', function () {
    assert.strictEqual(trova(".","coverage"), "the string entered is a directory")
  });

  it('qwerty for we.txt', function () {
    assert.strictEqual(trova(".","we.txt"), "qwerty")
  });

  it('the string entered is a directory for coverage', function () {
    assert.strictEqual(trova(".","fango"), "the string entered is a directory")
  });

  it('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa for sasso.txt', function () {
    assert.strictEqual(trova(".","sasso.txt"), "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  });
  
  it('sss for arguments.txt', function(){
    assert.strictEqual(trova(".","a.txt"), "sss")
  });
});