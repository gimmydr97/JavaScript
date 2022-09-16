var expect = chai.expect;


function digits(str){
    var len = str.length;
    var sum = 0;
    var n = 0;
    
    for (var i=0; i < len; i++){
        n = parseInt(str[i]);
        if(!isNaN(n)){
            sum = sum + n;
        }
    }
    return sum;
}

describe('The digit() function', function() {
    //only numbers
    it('Returns 3 for 111', function() {
      expect(digits("111")).to.equal(3);
    });
    //only letters
    it('Returns 0 for aaaa', function() {
      expect(digits("aaaa")).to.equal(0);
    });
    //letters followed by numbers
    it('Returns 15 for b3345a', function() {
        expect(digits("b3345a")).to.equal(15);
      });
    //numbers followed by letters
    it('Returns 2 for 11aa', function() {
        expect(digits("11aa")).to.equal(2);
      });
    //empty string
    it('Returns 0 for empty string', function() {
        expect(digits("")).to.equal(0);
      });
});

function letters(str){
       var len = str.length;
       var num = 0;
       for (var i=0; i < len; i++){
           if(isNaN(parseInt(str[i]))){
               num = num + 1;
           }
       }
       return num;
   }

describe('The letters() function', function() {
    //only numbers
    it('Returns 0 for 111', function() {
      expect(letters("111")).to.equal(0);
    });
    //only letters
    it('Returns 4 for aaaa', function() {
      expect(letters("aaaa")).to.equal(4);
    });
    //letters followed by numbers
    it('Returns 2 for b3345a', function() {
        expect(letters("b3345a")).to.equal(2);
      });
    //numbers followed by letters
    it('Returns 2 for 11aa', function() {
        expect(letters("11aa")).to.equal(2);
      });
    //empty string
    it('Returns 0 for empty string', function() {
        expect(letters("")).to.equal(0);
      });
});


function sum(str,s){
    num = parseInt(str);
    if(!isNaN(num)){
        return num + s;
    }
    return s;
}
//creation of two array that contains respectively the strings of the tests and the good results expected. 
describe('The sum() function', function() {
        const strings = ['111', 'aaaa', 'b3345a', '11aa', '' ];
        const expected = [111,111,111,122,122];
        var s = 0;
// do a for that execute 5 times the function sum with the parameters taken from the array 
        for(var i = 0 ; i < 5 ; i++){
            str = strings[i];
            exp = expected[i];
            s = sum(str,s);
            //in this statement at every cicle do the equality between 
            //the result of the function and the expected result
            it(`Return ${exp} for ${str}`, function() {
                expect(s).to.equal(exp);
              });
        }
});






