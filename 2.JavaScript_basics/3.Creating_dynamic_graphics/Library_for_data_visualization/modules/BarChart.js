
   
export function drawBarChart(ctx,arry,arrx,maxElem){
       var larg = window.innerWidth;
       var alt =  window.innerHeight;
    
       var unitya = (alt -(alt/10))/maxElem;
       var unityl = (larg - (larg/10))/maxElem;
       var dist = unityl/5;
       var spostamento = unityl;
       

       for(var i = 0 ; i < arry.length; i++){
            ctx.fillStyle = 'rgba(0, 142,149, 1)';
            ctx.beginPath();
            ctx.fillRect(spostamento, 25 + ((maxElem*unitya)-(arry[i]*unitya)), unityl, unitya*arry[i]);
            ctx.fillText(arrx[i], spostamento + unityl/100 , 25 + (unitya * maxElem) + 20 );
            spostamento = spostamento + unityl + dist;
            ctx.closePath();
        }
        var cont = maxElem;
        for(var i = 0; i <= maxElem; i++){
            ctx.fillText(cont, unityl-15 , 25 + (unitya*i));
            cont--;
        }
    
        ctx.beginPath();
        ctx.moveTo(unityl-2, 25);
        ctx.lineTo(unityl-2, 25 + (unitya * maxElem) + 10);
        ctx.moveTo(unityl-2, 25 + (unitya * maxElem) + 10);
        ctx.lineTo(unityl-2 + spostamento, 25 + (unitya * maxElem) + 10);
        ctx.closePath();
        ctx.stroke();
}

    //sun Day in a week
    // [3,2,1]
    // [sunny, raiy, cloudy]
    // l = 1000 => 900/3 = 300