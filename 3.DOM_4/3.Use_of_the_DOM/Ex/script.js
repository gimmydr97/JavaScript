
var tds = document.getElementsByTagName("td");
var speed = Math.round(Math.random()*10);
var angle = Math.round(Math.random()*180);
    
    for (var j=0; j<tds.length; j++){
    
        td = tds[j];
        td.style.transitionDuration = `${speed}s`;
        td.style.transitionProperty = 'transform';
        td.addEventListener('mouseenter',(e) =>{
            
            timeoutID = setTimeout(() => {
                tdleft = e.target.previousElementSibling;
                tdright = e.target.nextElementSibling;
                
                if(tdleft == null) tdleft = tdright.nextElementSibling;
                if(tdright == null) tdright = tdleft.previousElementSibling;
                console.log(tdleft.childNodes[0].nodeValue);
                console.log(tdright.childNodes[0].nodeValue);
                tdleft.style.transform = `rotate(${angle}deg)`;
                tdright.style.transform = `rotate(-${angle}deg)`;
                
            }, 1000);
            
        });
        
        td.addEventListener('mouseout',(e) =>{
            clearInterval(timeoutID);
            timeoutID = null;
            tdleft.style.transform = `rotate(0deg)`;
            tdright.style.transform = `rotate(0deg)`;
            
        });
    }



