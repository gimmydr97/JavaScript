export function create(){
    var ctx = document.getElementById("canvas").getContext('2d');
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    return ctx;
}
