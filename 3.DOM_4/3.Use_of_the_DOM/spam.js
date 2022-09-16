var valore = document.getElementById("counter").value;

    
    let intervalId;

    if(!intervalId){
        intervalId = setInterval(dec, 1000);
    }
  


    function dec(){
        if (valore != 0){
            valore  = (valore-1);
            if (valore == 0){
                document.getElementById("counter").value = 0;
            }
            
            var elements = document.getElementsByTagName("span");
            for(var i=0 ; i<elements.length ; i++){
                elements[i].childNodes[0].nodeValue = valore;
            }
        } 
        else{  
                    console.log("nothing");
                    valore = document.getElementById("counter").value;
             
        }
    }
        
   

    