var ctx = document.getElementById("canvas").getContext('2d');
    ctx.canvas.width  = window.innerWidth / 3 ;
    ctx.canvas.height = window.innerHeight;
    spostamento = 0;
    discesa = 0;
 let arrq = [];
 var points = 0;
 var timer = 60; 
 var fm = document.forms[0];
 let nsqu; 
 let nIntervId;
 


 for(var c=0; c< 10; c++) {
    arrq[c] = [];
    for(var r=0; r<10; r++) {
        arrq[c][r] = { x: 0, y: 0, green:false, point: 20 };
    }
}



function createField(){

    spostamento = 30;
    discesa = 0;
    var ncsqu = 0;
    
    for(var c= 0 ; c < 10 ; c++){
        for(var r = 0; r < 10; r++){
            
                ctx.beginPath();
                if( arrq[c][r].green == true){ 
                    if(arrq[c][r].point < 0){
                        ctx.fillStyle = 'rgb(255,0,0)';
                        ctx.fillRect(10 + spostamento, 10 + discesa, 25, 25);
                        ctx.fillStyle = "#0095DD";
                    }
                    else{
                        ctx.fillStyle = 'rgb(0,128,0)';
                        ctx.fillRect(10 + spostamento, 10 + discesa, 25, 25);
                        ctx.fillStyle = "#0095DD";
                    }
                }
                else{ctx.fillRect(10 + spostamento, 10 + discesa, 25, 25);}
                ctx.closePath();
           
            arrq[c][r].x = 10 + spostamento;
            arrq[c][r].y = 10 + discesa;
            spostamento = spostamento + 35;
            
            ncsqu++;
            if( ncsqu == nsqu){
                return;
            } 
        }
        spostamento = 30;
        discesa = discesa + 35;
    }
    
} 


function turnGreenRandom(n){
    c = Math.floor((Math.random()*n));
    r = Math.floor((Math.random()*10));
    console.log(c);
    console.log(r);
    if (arrq[c][r].green == false){
        arrq[c][r].green = true;
        var b = arrq[c][r];
        setInterval(function() {subtract(b.green, b)  },1000);
    } 
}

function subtract(flag, b){
    if(flag == true) b.point--;  
}

var x = ctx.canvas.width/4;
var y = ctx.canvas.height-30;
var dy = -2;
var ballRadius = 10;
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function collisionDetection() {
    for(var c=0; c < 10; c++) {
        for(var r=0; r < 10; r++) {
            var b = arrq[c][r];
            if( b.green === true){
                if(x > b.x  && x < b.x + 25 && y > b.y && y < b.y + 25) {
                    
                    replace(points+=b.point,"row1",0);
                    console.log(c + ", " + r);
                    console.log(b.point);
                    b.green = false;
                    b.point = 20;
                    turnGreenRandom(5);
                }
            }
        }
    }
}

function replace(points,row,pos){
    var newTD = document.createElement("td");
    var newTextNode = document.createTextNode(points);
    newTD.appendChild(newTextNode);
    var element = document.getElementById(row);
    var refTD = element.getElementsByTagName("td").item(pos);
    element.replaceChild(newTD ,refTD);
    if(timer < 0){
        clearInterval(nIntervId);
        nIntervId = null;

    }
    
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createField();
    drawBall();
    collisionDetection();
    if(rightPressed) {
        x+= 7;
    }
    else if(leftPressed) {
        x-= 7;
    }
    
    if(y+dy < 0) y = canvas.height;
    if(x > canvas.width) x = 0;
    if( x < 0 ) x = canvas.width;

    y += dy;
    if(timer > 0) requestAnimationFrame(draw);
    

}

function start(){
    nsqu = fm.elements["nsquares"].value;
    //level1
    for(var i = 0; i < nsqu; i++){
        if(Math.random()*10 > 5){
            turnGreenRandom(5);
        }
        
    }
    draw();
    if(!nIntervId){
        nIntervId = window.setInterval(function(){replace(timer--,"row1",1)},1000);
        
    }
    replace(document.getElementById("player").value,"row1p", 0);

    setTimeout(function(){nextLevel(-3,nsqu+25,7)},60000);
    setTimeout(function(){nextLevel(-4,nsqu+25,8)},120000);
    
}

function nextLevel(vel,nq,rq){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var c=0; c< 10; c++) {
        arrq[c] = [];
        for(var r=0; r<10; r++) {
            arrq[c][r] = { x: 0, y: 0, green:false, point: 20 };
        }
    }
    x = ctx.canvas.width/4;
    y = ctx.canvas.height-30;
    timer = 60;
    points = 0;
    replace(0,"row1",0);
    dy = vel;
    nsqu = nq;
    for(var i = 0; i < nsqu; i++){
        if(Math.random()*10 > rq){
            turnGreenRandom(6);
        }
    }
    draw();
    if(!nIntervId){
        nIntervId = window.setInterval(function(){replace(timer--,"row1",1)},1000);
        
    }
}