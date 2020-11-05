const songTitle = document.querySelector('.song-title');
const audioPlayer = document.querySelector('.audio-player');
const updateAudio = document.querySelector('.update-audio');

const playButton = document.querySelector('.play-button')
const audioElement = document.querySelector('.audio-player');
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain();

function createAudio(e) {
    const blob_url = URL.createObjectURL(e.target.files[0]);
    songTitle.innerText = `${e.target.files[0].name}`;
    audioPlayer.setAttribute('src', `${blob_url}`);
    const track = audioContext.createMediaElementSource(audioElement);
    track.connect(gainNode).connect(audioContext.destination);
}

function playingSound() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }
}

playButton.addEventListener('click', playingSound);

audioElement.addEventListener('ended', () => {
    playButton.dataset.playing = 'false';
});

updateAudio.addEventListener('input', (e) => {
    createAudio(e)
})