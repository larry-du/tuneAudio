const songTitle = document.querySelector('.song-title');
const audioPlayer = document.querySelector('.audio-player');
const updateAudio = document.querySelector('.update-audio');

const playButton = document.querySelector('.play-button')
const audioElement = document.querySelector('.audio-player');
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain();
const oscillator = audioContext.createOscillator();

const volumeControl = document.querySelector('.volume');
const volumeText = document.querySelector('.volume-text');

const detuneControl = document.querySelector('.detune');

function createAudio(e) {
    const blob_url = URL.createObjectURL(e.target.files[0]);
    songTitle.innerText = `${e.target.files[0].name}`;
    audioPlayer.setAttribute('src', `${blob_url}`);
    const track = audioContext.createMediaElementSource(audioElement);
    track.connect(oscillator).connect(gainNode).connect(audioContext.destination);
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

function tuneVolume(e) {
    const volume = e.target.value;
    gainNode.gain.value = volume;
    volumeText.innerText = `Volume : ${volume}`;
}

function tuneDetune(e) {
    console.log(oscillator);
    const detune = e.target.value;
}

playButton.addEventListener('click', playingSound);

audioElement.addEventListener('ended', () => {
    playButton.dataset.playing = 'false';
});

updateAudio.addEventListener('input', (e) => {
    createAudio(e)
})

volumeControl.addEventListener('change', (e) => tuneVolume(e))
detuneControl.addEventListener('change', (e) => tuneDetune(e))