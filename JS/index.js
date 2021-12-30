let astroid = document.querySelector('.astroid');
let img = document.querySelector('.astroid img');
let audio = document.querySelector('audio');

// function to destroy the astroid.
function destroy(clicked_id) {
    let astroid = document.getElementById(clicked_id);
    // play blast sound.
    audio.play();
    audio.volume = 0.02;
    astroid.classList.add('blast'); // add blast class into astroid
    setTimeout(() => { // remove that astroid after certain time period.
        astroid.remove();
    }, 250);
}