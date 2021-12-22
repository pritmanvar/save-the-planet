let astroid = document.querySelector('.astroid');
let img = document.querySelector('.astroid img');
let audio = document.querySelector('audio');

function blast(clicked_id) {
    let astroid = document.getElementById(clicked_id);
    audio.play();
    audio.volume = 0.02;
    astroid.classList.add('blast');
    setTimeout(() => {
        astroid.style.display = "none";
    }, 250);
}