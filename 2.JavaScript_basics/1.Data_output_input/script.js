
function stampa(){
 var fm = document.forms[0];
 var tx = fm.elements['text_field'].value;
 var n = fm.elements['number_field'].value;
 document.write(tx); 
 document.write(" ");
 document.write(n);

 console.log(tx,typeof(tx));
 console.log(n,typeof(n));
}       
