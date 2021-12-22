var c = document.querySelector("canvas");
var ctx = c.getContext("2d"); 
const origin_y = c.height / 2;
const origin_x = c.width / 2;

console.log("hello");

ctx.moveTo(origin_x, origin_y);
ctx.lineTo(origin_x+100,origin_y+100);
ctx.stroke();