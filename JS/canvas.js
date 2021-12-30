let c = document.querySelector("canvas");
let ctx = c.getContext("2d"); 
let body = document.querySelector("body");

c.height = window.innerHeight;
c.width = window.innerWidth;
const origin_y = c.height / 2;
const origin_x = c.width / 2;

// ctx.moveTo(origin_x, origin_y);
// ctx.lineTo(origin_x+100,origin_y+100);
// ctx.stroke();