let astroid = document.querySelector('.astroid');
let img = document.querySelector('.astroid img');
let blastSound = document.querySelector('.blastSound');

// function to destroy the astroid.
function destroy(clicked_id) {
    let astroid = document.getElementById(clicked_id);
    // play blast sound.
    blastSound.cloneNode(true).play();
    blastSound.volume = 0.1;
    astroid.classList.add('blast'); // add blast class into astroid
    setTimeout(() => { // remove that astroid after certain time period.
        astroid.remove();
    }, 250);
}