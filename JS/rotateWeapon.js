let main = document.querySelector("main");
let c = document.querySelector("canvas");
let ctx = c.getContext("2d"); 
let weapon = document.querySelector('.weapon');
let fire = document.querySelector('.fire');

// set height and width of canvas
c.height = window.innerHeight;
c.width = window.innerWidth;
// coordinates of origin.
const y1 = -c.height / 2;
const x1 = c.width / 2;
let angle; // angle of weapon


main.addEventListener('mousemove',(e)=>{
    // coordinates of mouse pointer.
    let y2 = -e.clientY; // taking with negative sign for correct quadrants system.
    let x2 = e.clientX;

    let m = (y2-y1)/(x2-x1); // slop of the line from (x2,y2) to (x1,y1)
    angle = Math.atan(m)*180/Math.PI; // angle of line

    // if current point is in 2nd or 3rd quadrant then i have to add 180deg into the angle.
    if(x1-x2 < 0){
        angle += 180;
    }
    // rotate weapon by that angle such that it moves corresponding to mouse
    weapon.style.transform = `translate(-50%,-50%) rotate(${-angle-90}deg)`;
});

// it will generate and fire new bullet on every click
main.addEventListener('click',()=>{
    fire.cloneNode(true).play();
    new generateBullet(angle);
});

// constructure to generate new bullete
function generateBullet(angle){
    // create a new span for bullete and add that into DOM.
    this.bullet = document.createElement("SPAN");
    main.appendChild(this.bullet);
    // give bullete class and set it's position.
    this.bullet.classList.add('bullet');
    this.bullet.style.transform = `rotate(${-angle+180}deg)`;
    this.bullet.style.left = x1 + "px";
    this.bullet.style.top = -y1 + "px";
    this.removeBullete = function () { // it will remove bullete from DOM.
        setTimeout(() => {
            this.bullet.remove();
        }, 5000);
    };
    this.removeBullete();
}
