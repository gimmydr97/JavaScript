import {create} from "Canvas";
import {drawBarChart} from "BarChart";

function drawing(arry,arrx,maxElem){
    var ctx = create();
    drawBarChart(ctx,arry,arrx,maxElem);
}
