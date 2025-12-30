let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Crear nuevo elemento de audio
let curr_track = document.createElement('audio');

// Define las pistas que se deben reproducir
let track_list = [
  {
    name: "Belleza y Fealdad",
    artist: "IA",
    image: "img/belleza-y-fealdad.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/Belleza y Fealdad.mp3"
  },
	{
		name: "No teníamos nada",
		artist: "IA",
		image: "img/no-teniamos-nada.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/No teníamos nada.mp3"
	},
	{
		name: "Las estrellas en tu piel",
		artist: "IA",
		image: "img/las-estrellas-en-tu-piel.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Las estrellas en tu piel.mp3"
	},
	{
		name: "No soy poeta",
		artist: "IA",
		image: "img/no-soy-poeta.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/No soy poeta.mp3"
	},
	{
		name: "Si te vas yo me voy",
		artist: "IA",
		image: "img/si-te-vas-yo-me-voy.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Si te vas yo me voy.mp3"
	},
	{	
		name: "Canción romántica profunda",
    artist: "IA",
    image: "img/cancion-romantica-profunda.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/Canción romántica profunda.mp3"
  },
  {
    name: "Dímelo",
    artist: "IA",
    image: "img/dimelo.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/Dímelo.mp3"
  },
	{
		name: "Misterio y luz",
		artist: "AI",
		image: "img/misterio-y-luz.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Misterio y luz.mp3"
	},
  {
    name: "Cada lágrima es un amanecer",
    artist: "AI",
    image: "img/cada-lagrima-es-un-amanecer.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/Cada lágrima es un amanecer.mp3"
  },
  {
    name: "Si tengo que",
    artist: "IA",
    image: "img/si-tengo-que.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/Si tengo que.mp3"
  },
	{
		name: "Amor a medias",
		artist: "IA",
		image: "img/amor-a-medias.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Amor a medias.mp3"
	},
	{
		name: "Yo quiero ser ese",
		artist: "IA",
		image: "img/yo-quiero-ser-ese.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Yo quiero ser ese.mp3"
	},
  {
    name: "No me digas que no",
    artist: "IA",
    image: "img/no-me-digas-que-no.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/No me digas que no.mp3"
  },
  {
    name: "Hoy elijo confiar",
    artist: "IA",
    image: "img/hoy-elijo-confiar.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/Hoy elijo confiar.mp3"
  },
  {
    name: "Por qué la vida es",
    artist: "IA",
    image: "img/por-que-la-vida-es.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/Por qué la vida es.mp3"
  },
	{
		name: "La última carta",
		artist: "IA",
		image: "img/la-ultima-carta.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/La última carta.mp3"
	},
];

function random_bg_color() {

  // Obtenga un número entre 124 y 224 (para obtener colores más claros)
  let red = Math.floor(Math.random() * 224) + 124;
  let green = Math.floor(Math.random() * 224) + 124;
  let blue = Math.floor(Math.random() * 224) + 124;

  // Construye un color con los valores dados
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Establezca el fondo en ese color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = (track_index + 1) + " / " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);    
	curr_track.addEventListener("ended", playTrack);
	random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Cargar la primera pista en la lista de pistas
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) {
		playTrack();
  } else {
		pauseTrack();
	}
}

const reproducir = "svg/play.svg";
const pausar = "svg/pause.svg";

function playTrack() {
  curr_track.play();
  isPlaying = true;
	document.getElementById('iconoControl').src = pausar;
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
	document.getElementById('iconoControl').src = reproducir;
}

function nextTrack() {
  if (track_index < track_list.length - 1) {
		track_index += 1;
  } else { 
		track_index = 0;
	}
	loadTrack(track_index);
	document.getElementById('iconoControl').src = reproducir;
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
		track_index = track_list.length;
	}
	loadTrack(track_index);
	document.getElementById('iconoControl').src = reproducir;
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


