const songs = [
    { title: "Shinuoga E-wa", artist: "Fujit Kaze", album: "HELP EVER HURT NEVER", src: "/music/Fujii Kaze - Shinunoga E-Wa (Lyrics).mp3", cover: "/image/Fujii_Kaze_-_Help_Ever_Hurt_Never.png",backgroundvideo:"/video/35a798856c0a69a7ac6a2ed4f6e93ae0.mp4" },
    { title: "Chaleya", artist: "Jawan", album: "Jawan", src: "music/https_youtu.be_VAdGW7QDJiU_[_YouConvert.net_].mp3", cover:"/image/Chaleya_album_cover.jpg",backgroundvideo:"/video/d1128932c72278e97903a72a3e9649ef.mp4"},
    { title: "Ahistha Ahistha", artist: "Kazinama ", album: "Kazinama · Musarrat Nazire", src: "/music/Musarrat_Nazir_-_Ahista_Ahista_(Lyrics)_[_YouConvert.net_].mp3", cover: "/image/ahista-ahista-.jpg",backgroundvideo:"/video/6a768256155f990effb346a27ec61f58.mp4" },
    
    
];

let currentSongIndex = 0;
const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause");
const seekBar = document.getElementById("seek-bar");
const repeatButton = document.getElementById("repeat");
const infiniteButton = document.getElementById("infinite");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");
const album = document.getElementById("album");
const albumArt = document.getElementById("album-art");

function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    album.textContent = song.album;
    audio.src = song.src;
    albumArt.src = song.cover;
    document.body.style.backgroundColor= song.background;
     //change in background
     const bgvideo = document.getElementById("bgvideo");
     bgvideo.src = song.backgroundvideo;
     bgvideo.load();
     
     // Mute the video and set it to autoplay
     bgvideo.muted = true;
     bgvideo.autoplay = true;
     bgvideo.loop = true; // 
 }


playPauseButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = "&#10074;&#10074;";
    } else {
        audio.pause();
        playPauseButton.innerHTML = "&#9654;";
    }
});

nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseButton.innerHTML = "&#10074;&#10074;";
});

prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseButton.innerHTML = "&#10074;&#10074;";
});

audio.addEventListener("timeupdate", () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
});

seekBar.addEventListener("input", () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
});

repeatButton.addEventListener("click", () => {
    audio.loop = !audio.loop;
    repeatButton.style.color = audio.loop ? "green" : "white";
});

infiniteButton.addEventListener("click", () => {
    audio.addEventListener("ended", () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        audio.play();
    });
    infiniteButton.style.color = "green";
});
document.querySelector(".exit-btn").addEventListener("click", () => {
window.history.back(); // Takes the user to the previous page
});


loadSong(currentSongIndex);
