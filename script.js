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
    displayName: 'Irrelevant',
    artist: 'P!nk'
   }, 
   {
    name: 'item-3',
    displayName: 'Human',
    artist: "Rag'n'Bone Man"
   }, 
   {
    name: 'item-4',
    displayName: 'Just Like Fire',
    artist: 'P!nk'
   }, 
   {
    name: 'item-5',
    displayName: 'Am I Wrong',
    artist: 'Nico & Vinz'
   }, 
   {
    name: 'item-6',
    displayName: 'A Milion Dreams',
    artist: 'P!nk'
   }, 
   {
    name: 'item-7',
    displayName: 'All I Know So Far',
    artist: 'P!nk'
   }, 
   {
    name: 'item-8',
    displayName: 'La La La',
    artist: 'Naughty Boy & Sam Smith'
   }, 
   {
    name: 'item-9',
    displayName: 'Flaws',
    artist: 'Calum Scott'
   }, 
   {
    name: 'item-10',
    displayName: 'Can I Get It',
    artist: 'Adele'
   }, 
   {
    name: 'item-11',
    displayName: 'Easy On Me',
    artist: 'Adele'
   }, 
   {
    name: 'item-12',
    displayName: "There Isn't Much",
    artist: 'Emeli Sande'
   }, 
   {
    name: 'item-13',
    displayName: 'Wildest Moments',
    artist: 'Jessie Ware'
   }, 
   {
    name: 'item-14',
    displayName: 'Zemer',
    artist: 'Violin Cover Cristina Kiseleff'
   }, 
   {
    name: 'item-15',
    displayName: 'Hava Nagila (הבה נגילה)',
    artist: 'Violin Cristina Kiseleff'
   }, 
   {
    name: 'item-16',
    displayName: 'Kiss Kiss (Simarik)',
    artist: 'Violin Cover Cristina Kiseleff'
   }, 
   {
    name: 'item-17',
    displayName: 'MACARENA Los Del Rio',
    artist: 'Violin Cover Cristina Kiseleff'
   }, 
   {
    name: 'item-18',
    displayName: 'PRINCE IGOR',
    artist: 'Violin Cover Cristina Kiseleff'
   }, 
   {
    name: 'item-19',
    displayName: 'Aerosmith-dont want to miss a thing',
    artist: 'Violin Cover Cristina Kiseleff'
   }, 
   {
    name: 'item-20',
    displayName: 'Balada-Ciprian Porumbescu',
    artist: 'Violin Cover Cristina Kiseleff'
   }, 
   {
    name: 'item-21',
    displayName: 'The Skylark',
    artist: 'Violin Cover Cristina Kiseleff'
   }, 
   {
    name: 'item-22',
    displayName: 'Mecano - Hijo de la luna',
    artist: 'Violin Cover Cristina Kiseleff'
   }, 
   {
    name: 'item-23',
    displayName: 'Jerusalema-master-kg',
    artist: 'Violin Cover Cristina Kiseleff'
   }, 
   {
    name: 'item-24',
    displayName: 'Kaoma - lambada',
    artist: 'Violin Cover Cristina Kiseleff'
   }, 
   {
    name: 'item-25',
    displayName: 'Michael Jackson - give in to me',
    artist: 'Violin Cover Cristina Kiseleff'
   }, 
   {
    name: 'item-26',
    displayName: 'Polaris',
    artist: 'Violin Cover Cristina Kiseleff'
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