const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/Maula Mere Maula.mp3',
        displayName: 'Maula Mere Maula',
        cover: 'assets/no cover photo available.png',
        artist: 'Roop Kumar Rathod,Anwar',
    },
    {
        path: 'assets/Tumhe Jo Maine Dekha.mp3',
        displayName: 'Tumhe Jo Maine Dekha',
        cover: 'assets/Tumhe Jo Maine Dekha.png',
        artist: 'Anu Malik',
    },
    {
        path: 'assets/Tune Mere Jana.mp3',
        displayName: 'Tune Mere Jana',
        cover: 'assets/Tune Mere Jana.png',
        artist: 'Gajendra Verma',
    },
    {
        path: 'assets/Mera Dil Bhi Kitna.mp3',
        displayName: 'Mera Dil Bhi Kitna',
        cover: 'assets/no cover photo available.png',
        artist: 'Kumar Sanu',
    },
    {
        path: 'assets/dil vich lagya.mp3',
        displayName: 'dil vich lagya',
        cover: 'assets/dil vich lagya.jpg',
        artist: 'Kunal Gurshabad, Sonu nigam',
    },
    {
        path: 'assets/Kyaa Dil Ne Kaha.mp3',
        displayName: 'Kyaa Dil Ne Kaha',
        cover: 'assets/no cover photo available.png',
        artist: 'Udit narayan, Alka Yagnik',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

function toggleExpand() {
    const container = document.querySelector('.library_container');
    container.classList.toggle('expanded');
}
// function library(){
//     music.src = songs.path;
//     title.textContent = songs.displayName;
//     image.src = songs.cover; 
// }

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
