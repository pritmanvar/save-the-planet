let weapon = document.querySelector('.weapon');
// coordinates of origin.
const y1 = -c.height / 2;
const x1 = c.width / 2;

c.addEventListener('mousemove',(e)=>{
    // coordinates of mouse pointer.
    let y2 = -e.clientY; // taking with negative sign for correct quadrants system.
    let x2 = e.clientX;

    let m = (y2-y1)/(x2-x1); // slop of the line from (x2,y2) to (x1,y1)
    let angle = Math.atan(m)*180/Math.PI; // angle of line

    // if current point is in 2nd or 3rd quadrant then i have to add 180deg into the angle.
    if(x1-x2 < 0){
        angle += 180;
    }
    // rotate weapon by that angle such that it moves corresponding to mouse
    weapon.style.transform = `translate(-50%,-50%) rotate(${-angle-90}deg)`;
})