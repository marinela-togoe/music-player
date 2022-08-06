const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev'); 
const playBtn = document.getElementById('play'); 
const nextBtn = document.getElementById('next'); 

// Music
const songs = [
   {
    name: 'item-1',
    displayName: 'Are You With Me',
    artist: 'Lost Frequencies'
   }, 
   {
    name: 'item-2',
    displayName: 'P!nk',
    artist: 'Irrelevant'
   }, 
   {
    name: 'item-3',
    displayName: "Rag'n'Bone Man",
    artist: 'Human'
   }, 
   {
    name: 'item-4',
    displayName: 'P!nk',
    artist: 'Just Like Fire'
   }, 
   {
    name: 'item-5',
    displayName: 'Nico & Vinz',
    artist: 'Am I Wrong'
   }, 
   {
    name: 'item-6',
    displayName: 'P!nk',
    artist: 'A Milion Dreams'
   }, 
   {
    name: 'item-7',
    displayName: 'P!nk',
    artist: 'All I Know So Far'
   }, 
   {
    name: 'item-8',
    displayName: 'Naughty Boy & Sam Smith',
    artist: 'La La La'
   }, 
   {
    name: 'item-9',
    displayName: 'Lorde',
    artist: 'Royals'
   }, 
   {
    name: 'item-10',
    displayName: 'Adele',
    artist: 'Can I Get It'
   }, 
   {
    name: 'item-11',
    displayName: 'Adele',
    artist: 'Easy On Me'
   }, 
   {
    name: 'item-12',
    displayName: 'Emeli Sande',
    artist: "There Isn't Much"
   }, 
   {
    name: 'item-13',
    displayName: 'Jessie Ware',
    artist: 'Wildest Moments'
   }, 
];



// Check if Playing
let isPlaying = false;


// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song 
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// Next Song 
function nextSong() {
    songIndex++;

    if (songIndex > songs.length -1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar and Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        
        // Update progress bad width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for the duration
        const durationMinutes = Math.floor(duration / 60);
        // console.log('minutes', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // console.log('seconds', durationSeconds);
        
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
         // Calculate display for the current
         const currentMinutes = Math.floor(currentTime / 60);
        //  console.log('minutes', currentMinutes);
         let currentSeconds = Math.floor(currentTime % 60);
         if (currentSeconds < 10) {
             currentSeconds = `0${currentSeconds}`;
         }
        //  console.log('seconds', currentSeconds);
         currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    // console.log(e);
    const width = this.clientWidth;
    // console.log('width', width);
    const clickX = e.offsetX;
    // console.log('clickX', clickX);
    const { duration } = music;
    // console.log(clickX / width);
    // console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration;

}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);