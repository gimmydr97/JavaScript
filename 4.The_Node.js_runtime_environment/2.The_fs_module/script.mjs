import * as fs from 'fs';

const args = process.argv;
var str = args[2];
var pat = ".";


export function trova(pat,str){
    
    try{
        const buffer = fs.readFileSync(pat + "/" + str);
        return buffer.toString();
        //console.log(/*"the string entered is the name of a file and its content is : \n" +*/ buffer.toString());
    }catch(e){ 
        try{
            var arr = fs.readdirSync(pat + "/" + str); 
            return "the string entered is a directory";
            //console.log("the string entered is a directory");
        
        }catch(e){
            var root = fs.readdirSync(pat);
            for(var i = 0; i < root.length; i++){
                try{
                    var ex = fs.readdirSync(pat + "/" + root[i]);
                    var adg = pat;
                    pat = pat + "/" + root[i];
                    console.log(pat);
                    var result = trova(pat,str);
                    if (result !== undefined){
                        return result;
                    }
                    else {pat = adg;}
                }catch(e){/*console.log("non sono una directory");*/}
            }
        }
    }
}


console.log(trova(pat, str));
