var SetIntervalTime =[];
var SetTimeoutTime =[];
var c = 10;
var M =  document.getElementById("number_field").value;

let nIntervId;
let timeoutID;
let flag = true;

function doTimeConsumingCallculationsWithSetInterval() {
    console.log("continuo");
    SetIntervalTime.push(performance.now());
    if(SetIntervalTime.length > c ){
        SetIntervalTime.shift();
    }
    calculatePrimes (1000, 10000000);
}

function doTimeConsumingCallculationsWithSetTimeout() {
    console.log("anche io");
    SetTimeoutTime.push(performance.now());
    if(SetTimeoutTime.length > c ){
        SetTimeoutTime.shift();
    }
    calculatePrimes (1000, 10000000); 
    if(flag == true){
        window.setTimeout(doTimeConsumingCallculationsWithSetTimeout, M);
    }
    
}

function calculatePrimes(iterations, multiplier) {
    var primes = [];
    for (var i = 0; i < iterations; i++) {
      var candidate = i * (multiplier * Math.random());
      var isPrime = true;
      for (var c = 2; c <= Math.sqrt(candidate); ++c) {
        if (candidate % c === 0) {
            // not prime
            isPrime = false;
            break;
         }
      }
      if (isPrime) {
        primes.push(candidate);
      }
    }
    return primes;
  }

var avgI = 0; 
var avgT = 0;

function drawChart(){
    var sum = 0;
    
    if(SetIntervalTime.length >= 2 && SetTimeoutTime.length >= 2 ){

        for(var i = 1; i < SetIntervalTime.length; i++){
            var diff = SetIntervalTime[i]-SetIntervalTime[i-1];
            sum = sum + diff;
        }
        avgI = sum/(SetIntervalTime.length-1);
        
        sum = 0;

        for(var i = 1; i < SetTimeoutTime.length; i++){
            var diff = SetTimeoutTime[i]-SetTimeoutTime[i-1];
            sum = sum + diff;
        }
        avgT = sum/(SetTimeoutTime.length-1);

    }

    draw([avgI/50,avgT/50]);
    
}

function draw(arr){   
    let canvas = document.getElementById('chart');
     let ctx = canvas.getContext('2d');
     canvas.height = 500;
     canvas.width = 400;
     
     let config = {width:30,height:0,spaceBetweenBars:5,color:"green"};
     
     let values = arr;
     // copy the values array and fill it with 0. 
     // This is the value of bars height during the animation
     let currentValues = values.slice().fill(0); // [0,0,0,0,0]
     
     let startingX = 50;
     
     
     function drawBar(height,i){
         let x = startingX;
         x += i*(config.width + config.spaceBetweenBars);
         ctx.fillStyle = config.color;
         ctx.beginPath();
         ctx.fillRect(x, canvas.height,  config.width,  -height);
     }
     
     // I'm using requestAnimationFrame since it's much more efficient.
     
    function drawing(){
      
      for(let i = 0; i < values.length;i++) {
        window.requestAnimationFrame(drawing);
        if(currentValues[i] < values[i]){
         currentValues[i] ++;
         drawBar(currentValues[i],i)
        }
      }
    }
    drawing()
}  

function start(){
    if(!nIntervId){
        nIntervId = window.setInterval(doTimeConsumingCallculationsWithSetInterval, M);
    }
    timeoutID = window.setTimeout(doTimeConsumingCallculationsWithSetTimeout, M);
    
}

/*function s(){
    for(var i = 0; i<3; i++){
        doTimeConsumingCallculationsWithSetInterval();
        doTimeConsumingCallculationsWithSetTimeout();
    }
    drawChart();
}*/

function stop(){
    clearInterval(nIntervId);
    nIntervId = null;
    flag = false;
    drawChart();
}
  