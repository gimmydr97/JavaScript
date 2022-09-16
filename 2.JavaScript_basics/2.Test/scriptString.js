
var s = 0;
"use strict";
do{
    var val = window.prompt();
    var dig = digits(val);
    var let = letters(val);
    s = sum(val);
    var str = dig + "\t" + let + "\t" + s;
    document.write(str +"<br>");

}while(val!==null);

"use strict";
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

"use strict";
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

"use strict";
function sum(str){
    num =parseInt(str);
    if(!isNaN(num)){
        return num + s;
    }
    return s;
}




