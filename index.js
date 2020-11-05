const songTitle = document.querySelector('.song-title');
const audioPlayer = document.querySelector('.audio-player');
const updateAudio = document.querySelector('.update-audio');

const playButton = document.querySelector('.play-button')
const audioElement = document.querySelector('.audio-player');

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function createAudio(e) {
    const blob_url = URL.createObjectURL(e.target.files[0]);
    songTitle.innerText = `${e.target.files[0].name}`;
    audioPlayer.setAttribute('src', `${blob_url}`);
    const track = audioContext.createMediaElementSource(audioElement);
    track.connect(gainNode).connect(audioContext.destination);
}

updateAudio.addEventListener('input', (e) => {
    createAudio(e)
})