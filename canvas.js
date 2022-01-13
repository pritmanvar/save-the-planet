let main = document.querySelector("main");
let blastImg = document.getElementById('blastImg')
let c = document.querySelector("canvas");
let ctx = c.getContext("2d"); 
let animationRequest;

const bulletWidth = 54;
// set height and width of canvas
c.height = window.innerHeight;
c.width = window.innerWidth;

// coordinates of origin.
const y1 = window.innerHeight / 2;
const x1 = window.innerWidth / 2;

let angle = 0; // angle of weapon

main.addEventListener('mousemove',(e)=>{
    // coordinates of mouse pointer.
    let y2 = c.height-e.clientY; // taking with negative sign for correct quadrants system.
    let x2 = e.clientX;

    let m = (y2-y1)/(x2-x1); // slop of the line from (x2,y2) to (x1,y1)
    angle = Math.atan(m); // angle of line

    // if current point is in 2nd or 3rd quadrant then i have to add 180deg into the angle.
    if(x1-x2 > 0){
        angle += Math.PI;
    }
});

// constructor for generating bullet.
function bullet(angle, velocity){
    this.angle = angle; // angle at which we have to fire.
    // intitally it's coordinates will be origin.
    this.x = x1; 
    this.y = y1;
    this.velocity = velocity; // velocity of bullet.
    this.size = 30;
    this.draw = function () { // draw the bullet.
        let bullet = new Image();
        bullet.src = './images/bullet2.png'
        ctx.drawImage(bullet,this.x-this.size/2,this.y-this.size/2,this.size,this.size);
    }
    this.update = function () { // update bullet's position acording to it's velocity
        let dx = velocity*Math.cos(this.angle);
        let dy = velocity*Math.sin(this.angle);
        this.x += dx;
        this.y += -dy;
        
        this.draw();
    }
}

let bullets = []; // to store bullets.
main.addEventListener('click',()=>{ // to generate new bullet
    let blt = new bullet(angle,20);
    bullets.push(blt);
    // fireSound.cloneNode(true).play();
});

// generate random position of astroid.
function getPositionOfAstroid(height) {
    let side = Math.floor(Math.random()*4);
    let top,left;
    if(side == 0){
        top = -height;
        left = Math.random()*c.width;
    }else if(side == 1){
        top = Math.random()*c.height;
        left = -height;
    }else if(side == 2){
        top = c.height;
        left = Math.random()*c.width;
    }else{
        top = Math.random()*c.height;
        left = c.width;
    }
    return {top,left};
}
function astroid(velocity){ 
    this.size = Math.random()*100 + 50; // size of astroid.
    // set it's position
    let position = getPositionOfAstroid(this.size);
    this.x = position.left + this.size/2;
    this.y = position.top + this.size/2;

    this.velocity = velocity; // velocity of astroid
    this.m = ((c.height-this.y)-y1)/((this.x)-x1); // slop
    this.angle = Math.atan(this.m); // angle between 2 points

    // if it is in 1st or 4th quadrant we have to substract PI form angel
    if(this.x-x1 > 0){
        this.angle -= Math.PI;
    }
    this.draw = function(){ // to draw the astroid
        let astroidImg = new Image();
        astroidImg.src = './images/astroid.png'
        ctx.drawImage(astroidImg,this.x-this.size/2,this.y-this.size/2,this.size,this.size);
    }
    this.update = function(){ // it will update position of astroid according to it's velocity
        let dx = velocity*Math.cos(this.angle);
        let dy = velocity*Math.sin(this.angle);
        this.x += dx;
        this.y += -dy;
        
        this.draw();
    }
}
let astroids = []; // it will store astroid.
let timeOut = 1000; // time period in ms after that new astroid will be generated
function generateAstroids() {
    astroids.push(new astroid(1)); // add new astroid into astroids array.
    timeOut -= 2; // reduce time out to increase difficulty.

    let interval = setTimeout(() => {
        generateAstroids();
        clearTimeout(interval);
    }, timeOut);
}
generateAstroids(); // start generating astroid.

// function to check that bullet is out of screen or not.
function isBulletOutOfScreen(bullet) {
    if(bullet.x+bullet.size/2 < 0 || bullet.y+bullet.size/2 < 0 || bullet.x-bullet.size/2 > c.width || bullet.y - bullet.size/2 > c.height){
        return true;
    }
    return false;
}
// it will detact collision between astroid and bullet.
function isCollision(astroid,bullet) {
    let distance = Math.pow((astroid.y-bullet.y),2)+Math.pow((astroid.x-bullet.x),2);
    return distance <= Math.pow(astroid.size/2 + bullet.size/2,2);
}

function animate() { // it will create animations for every element.
    animationRequest = requestAnimationFrame(animate); // for animation
    ctx.clearRect(0, 0, c.width, c.height);
    
    let earth = new Image();
    earth.src = './images/earth.png';
    let earthSize = 130;
    let weapon = new Image();
    weapon.src = './images/weapon.png'
    
    // update astroid at every frame 
    for(let i = 0; i < astroids.length; i++){
        astroids[i].update();
    }

    // update bullet at every frame 
    for(let i = 0; i < bullets.length; i++){
        bullets[i].update();
        if(isBulletOutOfScreen(bullets[i]) == true){ // if bullete is out of screen then remove that.
            bullets.splice(i,1);
            i--;
        }
    }
    
    // to detect collision
    for(let i = 0; i < astroids.length; i++){
        let isRemoved = false;
        for(let j = 0; j < bullets.length; j++){
            // if there is collision between ith astroid and jth bullet.
            if(isCollision(astroids[i],bullets[j]) == true){ 
                // play blast gif at astroid.
                blastImg.style.top = astroids[i].y-astroids[i].size/2 + "px";
                blastImg.style.left = astroids[i].x-astroids[i].size/2 + "px";
                blastImg.style.height = astroids[i].size + "px";
                blastImg.style.display = "block";
                setTimeout(() => {
                    blastImg.style.display = "none";
                }, 200);
                
                // remove current bullet and astroid form arrays.
                astroids.splice(i,1);
                bullets.splice(j,1);
                isRemoved = true;
                break;
            }
        }
        if(isRemoved == true){
            i--;
            continue;
        }

        // to detect collision between current astroid and earth.
        let distanceFromEarth = Math.pow((astroids[i].y-y1),2)+Math.pow((astroids[i].x-x1),2);
        // if there is collision then it is GAME OVER.
        if(distanceFromEarth <= Math.pow(astroids[i].size/2 + earthSize/2,2)){            
            // Game Is Over so cancel the animation.
            cancelAnimationFrame(animationRequest);
        }
    }
    
    // draw earth image.
    ctx.drawImage(earth,x1-earthSize/2,y1-earthSize/2,earthSize,earthSize); 
    
    // draw weapon image
    ctx.save();
    ctx.translate(c.width/2,c.height/2);
    ctx.rotate(-angle);
    ctx.drawImage(weapon,90-weapon.width/2,-weapon.width/2);
    ctx.restore();
}
animate();