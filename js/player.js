// ============================================
// ROBOTIC DUB — player.js v3
// Fix erreur 153 : youtube-nocookie + autoplay
// ============================================

const TRACKS = [
  {videoId:"QQeZgO2sJMI",  title:"Sex Line",                     mix:"Original Mix",                    catalog:"SPCDG007"},
  {videoId:"_Wcl8qJd_Gw",  title:"That's the Question",          mix:"Nick & Danny Chatelain Remix",    catalog:"SPCDG008"},
  {videoId:"d_aB31ijjqI",  title:"That's the Question",          mix:"Original Mix",                    catalog:"SPCDG008"},
  {videoId:"SjWkvriuLGM",  title:"In Here with Us",              mix:"Original Mix",                    catalog:"SPCDG009"},
  {videoId:"wskd75kSpQA",  title:"Storm",                        mix:"Original Mix",                    catalog:"SPCDG011"},
  {videoId:"J6pZ1CgbCxk",  title:"Flowers",                      mix:"Original Mix",                    catalog:"SPCDG010"},
  {videoId:"ys2jm97HWEs",  title:"Fast, Slow, Harder",          mix:"Original Mix",                    catalog:"SPCDG018"},
  {videoId:"9qJrRS5mHRc",  title:"Marlon",                       mix:"Original Mix",                    catalog:"SPCDG016"},
  {videoId:"DsoApc5PM_8",  title:"Here's Johnny",                mix:"Original Mix",                    catalog:"SPCDG012"},
  {videoId:"Fr8dW0wgUoY",  title:"Flowers",                      mix:"Pumping Mix",                     catalog:"SPCDG010b"},
  {videoId:"TuhrTFWnM4Y",  title:"Can't see it",                mix:"Original Mix",                    catalog:"SPCDG019"},
  {videoId:"LjBdoIehL2E",  title:"Same Way",                    mix:"Original Mix",                    catalog:"SPCDG020"},
  {videoId:"UAUSJao_iAc",  title:"Need More",                   mix:"Original Mix",                    catalog:"SPCDG021"},
  {videoId:"eVNM8CY3V9Y",  title:"2001",                        mix:"Original Mix",                    catalog:"SPCDG013"},
  {videoId:"Se-WogGWKdM",  title:"Memories",                    mix:"Original Mix",                    catalog:"SPCDG017"},
  {videoId:"rmKlaA6iKX4",  title:"Memories",                    mix:"Departure Mix",                   catalog:"SPCDG017b"},
  {videoId:"odHzkATmRXI",  title:"Goodness Is Chosen",          mix:"Original Mix",                    catalog:"SPCDG014"},
  {videoId:"CLc0wIr8jSc",  title:"Goodness is chosen",          mix:"Peaktime Mix",                    catalog:"SPCDG014b"},
  {videoId:"yDnh1ZrsGLs",  title:"Survivor",                    mix:"Original Mix",                    catalog:"SPCDG015"},
  {videoId:"oJcee6uLNgQ",  title:"2000 Light Years From Home",  mix:"Original Mix",                    catalog:"SPCDGFD001"},
  {videoId:"1Rtj6Pd4SHI",  title:"Open Eyes",                   mix:"Original Mix",                    catalog:"SPCDG022"},
  {videoId:"wur96h4ZTrc",  title:"Eyes Closed",                 mix:"Original Mix",                    catalog:"SPCDG023"},
  {videoId:"LJfGMSK2oEo",  title:"Cold Room",                  mix:"Original Mix",                    catalog:"SPCDG027"},
  {videoId:"ahWRUwKH72c",  title:"Stratmos",                    mix:"Original Mix",                    catalog:"SPCDG028"},
  {videoId:"ZRDUWOyanO0",  title:"Infectious",                  mix:"Original Mix",                    catalog:"SPCDG025"},
  {videoId:"-BEFM-DkdFc",  title:"The Watcher",                 mix:"Original Mix",                    catalog:"SPCDG029"},
  {videoId:"uH867wsfjCM",  title:"The End",                     mix:"Original Mix",                    catalog:"SPCDGFD002"},
  {videoId:"juYH3qJEcmE",  title:"Control your mind",           mix:"Original Mix",                    catalog:"SPCDG030"},
  {videoId:"wko5AugLhgg",  title:"Really Care",                  mix:"Original Mix",                    catalog:"SPCDG031"},
  {videoId:"XfK5AOxxE7M",  title:"Come Here Baby",               mix:"Original Mix",                    catalog:"SPCDG032"},
  {videoId:"CsDLWm0G0Ko",  title:"Slam - Exhibit 1",            mix:"Robotic Dub Remix",               catalog:"SPCDGFD003"},
  {videoId:"78UU5_ea0fg",  title:"I Like it Hard",              mix:"Original Mix",                    catalog:"SPCDG033"},
  {videoId:"ti-Wzt_kfLo",  title:"Arpeggiator Dance",            mix:"Original Mix",                    catalog:"SPCDG034"},
  {videoId:"jeRJDD4JzxY",  title:"Cold room",                    mix:"Minimal Mix",                     catalog:"SPCDG035"},
  {videoId:"a7j6lqYKXoQ",  title:"Deep Space",                  mix:"Robotic Dub Remix",               catalog:"SPCDG036"},
  {videoId:"Ph8Fv7twABo",  title:"Leave My Hero",               mix:"Original Mix",                    catalog:"SPCDG037"},
  {videoId:"u2pM_LwzKBs",  title:"Who do you think you are ?",  mix:"Original Mix",                    catalog:"SPCDG026"},
  {videoId:"e_IOvrdKZrs",  title:"Dark Percussion",             mix:"Original Mix",                    catalog:"SPCDG038"},
  {videoId:"c_OdWLjekuU",  title:"Mystical Aliens",             mix:"Original Mix",                    catalog:"SPCDG039"},
  {videoId:"-WA5bKzkI0o",  title:"Digital Chords",              mix:"Original Mix",                    catalog:"SPCDG042"},
  {videoId:"8CMS91Cz43s",  title:"All i see is darkness",       mix:"Original Mix",                    catalog:"SPCDG024"},
  {videoId:"Q0SUGwofD2s",  title:"Sex Line",                    mix:"Vince Michaelson Remix",          catalog:"SPCDG043"},
  {videoId:"wjTISwL_JKo",  title:"Acid on fire",                mix:"Original Mix",                    catalog:"SPCDG044"},
  {videoId:"4aTzLGSDPm4",  title:"Wake Up Darling",              mix:"Original Mix",                    catalog:"SPCDG041"},
  {videoId:"PY0n_0_VFR4",  title:"Stick Control",               mix:"Extended Mix",                   catalog:"SPCDG046"},
  {videoId:"Zf8uJPCkfXk",  title:"Ghost Dancing",               mix:"Original Mix",                    catalog:"SPCDG047"},
  {videoId:"I5EOl9fBsdA",  title:"Native Song",                 mix:"Original Mix",                    catalog:"SPCDG048"},
  {videoId:"dwU1ZA9jVZQ",  title:"La Escocesa",                 mix:"Original Mix",                    catalog:"SPCDG050"},
  {videoId:"4uWcn0qgnEI",  title:"Dernier Train",               mix:"Original Mix",                    catalog:"SPCDG051"},
  {videoId:"Q1ydvMClFh4",  title:"Voyages",                     mix:"Original Mix",                    catalog:"SPCDG053"},
  {videoId:"3TO46YAbkG0",  title:"Voyages",                     mix:"Vince Michaelson Remix",          catalog:"SPCDG054"},
  {videoId:"QJYlr6QpcRM",  title:"Weather Report",              mix:"Original Mix",                    catalog:"SPCDG056"},
  {videoId:"2bHlx30BcQE",  title:"Feed My Brain",               mix:"Original Mix",                    catalog:"SPCDG057"},
  {videoId:"-oufB06qqi8",  title:"Feed My Brain",              mix:"Vince Michaelson Remix",          catalog:"SPCDG058"},
  {videoId:"0JfAxbYqEwM",  title:"The Butterfly",              mix:"Original Mix",                    catalog:"SPCDG060"},
  {videoId:"oYa3wJYxL-c",  title:"The Great",                   mix:"Original Mix",                    catalog:"SPCDG059"},
  {videoId:"ymgQx3Vzhg4",  title:"Leave The Phone Baby",        mix:"Original Mix",                    catalog:"SPCDG061"},
  {videoId:"Olf75sIgpOY",  title:"Escape Death",                mix:"Original Mix",                    catalog:"SPCDG062"},
  {videoId:"PWI-EXOCPY8",  title:"Irish Ballad",               mix:"Original Mix",                    catalog:"SPCDG063"},
  {videoId:"8rGtRJTNb00",  title:"Coming For You",              mix:"Original Mix",                    catalog:"SPCDG066"},
  {videoId:"_E5fKgNGPG4",  title:"Be Gentle Go Slow",           mix:"Original Mix",                    catalog:"SPCDG067"},
  {videoId:"jtB9l7Es_4w",  title:"HIgh Rebonds",                mix:"Original Mix",                    catalog:"SPCDG068"},
  {videoId:"vK7Y2VeThoY",  title:"A Warning From Mars",         mix:"Original Mix",                    catalog:"SPCDG069"},
  {videoId:"FyYMDQmysWs",  title:"Acid Drop",                   mix:"Original Mix",                    catalog:"SPCDG070"},
  {videoId:"Du2se99i-uY",  title:"Again and Again",             mix:"Original Mix",                    catalog:"SPCDG071"},
  {videoId:"PDDkvTxW3Gs",  title:"Head, Mind, Body",           mix:"Original Mix",                    catalog:"SPCDG072"},
  {videoId:"WTVLONVfvwA",  title:"Trembling Horizons",          mix:"Original Mix",                    catalog:"SPCDG075"},
  {videoId:"T9MOhmS5Rpw",  title:"Relax",                      mix:"Original Mix",                    catalog:"SPCDG073"},
  {videoId:"vESpxDJHMy0",  title:"Sheherazade",                mix:"Original Mix",                    catalog:"SPCDG077"},
  {videoId:"XTeOCvI13V4",  title:"Law of Love",                mix:"Original Mix",                    catalog:"SPCDG074"},
  {videoId:"NNXxPHZ-YVs",  title:"Poem for a Girlfriend",       mix:"Original Mix",                    catalog:"SPCDG075"},
  {videoId:"OpAcRKPfRqA",  title:"Jackson's Speech",            mix:"Original Mix",                    catalog:"SPCDG078"},
  {videoId:"HQoHZw7btFI",  title:"Follow Me",                  mix:"Original Mix",                    catalog:"SPCDG079"},
  {videoId:"3tWIdM7W2UI",  title:"Free your mind",              mix:"Original Mix",                    catalog:"SPCDG080"},
  {videoId:"IvwBYg9hCv4",  title:"Landscape",                  mix:"Original Mix",                    catalog:"SPCDG081"},
  {videoId:"H8KmSip6BiA",  title:"Requiem",                     mix:"Original Mix",                    catalog:"SPCDG082"},
  {videoId:"gIorgzIl0ZA",  title:"Manimal",                     mix:"Original Mix",                    catalog:"SPCDG083"},
  {videoId:"oHMfib0lSoY",  title:"Hemisphere",                  mix:"Original Mix",                    catalog:"SPCDG084"},
  {videoId:"YznyWuZhSIg",  title:"Synthetic Body",             mix:"Original Mix",                    catalog:"SPCDG086"},
  {videoId:"P2rR5ezG3UI",  title:"Deeper",                      mix:"Original Mix",                    catalog:"SPCDG085"},
  {videoId:"ev14nc54lHs",  title:"Robotic Guitar",              mix:"Original Mix",                    catalog:"SPCDG087"},
  {videoId:"hrvZMvr83BQ",  title:"My Mind Is Not My Brain",     mix:"Original Mix",                    catalog:"SPCDG089"},
  {videoId:"bSJLLKPUs5A",  title:"No Way",                      mix:"Original Mix",                    catalog:"SPCDG091"},
  {videoId:"vSDy8fc4i9E",  title:"Return To Earth",             mix:"Original Mix",                    catalog:"SPCDG092"},
  {videoId:"Ry1-_iOx61E",  title:"Marlon",                      mix:"Dj ManuManu Remix",               catalog:"SPCDG093"},
  {videoId:"wB8YDSeushw",  title:"Law of Love",                 mix:"Vince Michaelson Remix",          catalog:"SPCDG094"},
  {videoId:"nCDAmQo1m4w",  title:"Bulgarian Choir",             mix:"Original Mix",                    catalog:"SPCDG096"},
  {videoId:"yCkAsHY-vy0",  title:"Confirmation",                mix:"Original Mix",                    catalog:"SPCDG098"},
  {videoId:"h2ZTF7SsgRs",  title:"Can't Stop It",               mix:"Original Mix",                    catalog:"SPCDG099"},
  {videoId:"mmwzcgSUuzM",  title:"More Life",                   mix:"Original Mix",                    catalog:"SPCDG100"},
  {videoId:"PvfHOM4RR5U",  title:"Trance Mission Concluded",    mix:"Original Mix",                    catalog:"SPCDG101"},
  {videoId:"ZyVa6A0V5l4",  title:"All I See Is Darkness",      mix:"Vince Michaelson Remix",         catalog:"SPCDG102"},
  {videoId:"Mtq-GXWWX_U",  title:"Disappeared",                mix:"Original Mix",                    catalog:"SPCDG103"},
  {videoId:"uBVJp4FhITc",  title:"Deep Sea",                   mix:"Original Mix",                    catalog:"SPCDG105"},
  {videoId:"d7akuQoKSuc",  title:"Under The Stars",             mix:"Original Mix",                    catalog:"SPCDG106"},
  {videoId:"fxH0XIcG6K4",  title:"Robotic Church",              mix:"Vince Michaelson Remix",         catalog:"SPCDG107"},
  {videoId:"jd0ok3BDW_0",  title:"Trippy",                     mix:"Original Mix",                    catalog:"SPCDG108"},
  {videoId:"3E-maHVeCjM",  title:"Good Time",                  mix:"Original Mix",                    catalog:"SPCDG109"},
  {videoId:"ei-hEMsNPMI",  title:"Luxe, Calme et Volupte",     mix:"Original Mix",                    catalog:"SPCDG110"},
  {videoId:"oA5ZgBH3U0c",  title:"What Do You See ?",          mix:"Original Mix",                    catalog:"SPCDG111"},
  {videoId:"xso3K9gpFHI",  title:"What Do You See ?",          mix:"Vince Michaelson Remix",         catalog:"SPCDG111"},
  {videoId:"oA5ZgBH3U0c",  title:"Marilyn's Life",              mix:"Original Mix",                   catalog:"SPCDG104"}
];

// Dédoublonnage par videoId
const seen = new Set();
const tracks = TRACKS.filter(t => {
  if (seen.has(t.videoId)) return false;
  seen.add(t.videoId);
  return true;
});

let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderPlaylist(tracks);
  loadTrack(0);
  setupSearch();
});

// ── Render ──────────────────────────────────
function renderPlaylist(list) {
  const container = document.getElementById('playlist');
  if (!container) return;
  container.innerHTML = '';
  list.forEach((track, i) => {
    const div = document.createElement('div');
    div.className = 'playlist-item';
    div.innerHTML =
      '<div class="title">' + esc(track.title) + '</div>' +
      '<div class="mix">'   + esc(track.mix)   + '</div>' +
      '<div class="meta">'  + esc(track.catalog)+ '</div>';
    div.addEventListener('click', () => loadTrack(tracks.indexOf(track)));
    container.appendChild(div);
  });
}

// ── Load track (miniature) ──────────────────
function loadTrack(index) {
  if (index < 0 || index >= tracks.length) return;
  currentIndex = index;
  const track = tracks[index];

  document.getElementById('nowPlaying').innerHTML =
    '<h3>&#9654; ' + esc(track.title) + '</h3>' +
    '<p>' + esc(track.mix) + ' &nbsp;|&nbsp; ' + esc(track.catalog) + '</p>';

  const thumb = document.getElementById('currentThumbnail');
  thumb.src = 'https://img.youtube.com/vi/' + track.videoId + '/hqdefault.jpg';
  thumb.onerror = function() {
    this.src = 'https://img.youtube.com/vi/' + track.videoId + '/mqdefault.jpg';
    this.onerror = null;
  };

  // Reset lecteur
  const iframe = document.getElementById('youtubePlayer');
  iframe.src = '';
  iframe.style.display = 'none';
  document.getElementById('videoThumbnail').style.display = 'flex';
  const vi = document.getElementById('videoInfo');
  if (vi) vi.style.display = 'none';

  // Highlight
  document.querySelectorAll('.playlist-item').forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
  const active = document.querySelector('.playlist-item.active');
  if (active) active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

// ── Play au clic sur la miniature ──────────
// Utilise youtube-nocookie + autoplay=1 → corrige erreur 153
function playCurrentVideo() {
  if (currentIndex >= tracks.length) return;
  const track  = tracks[currentIndex];
  const iframe = document.getElementById('youtubePlayer');
  const thumbW = document.getElementById('videoThumbnail');
  const vi     = document.getElementById('videoInfo');

  iframe.src = 'https://www.youtube-nocookie.com/embed/' + track.videoId
    + '?autoplay=1&rel=0&modestbranding=1';
  iframe.style.display = 'block';
  thumbW.style.display = 'none';

  if (vi) {
    vi.style.display = 'block';
    document.getElementById('videoTitleDisplay').textContent = track.title;
    document.getElementById('videoMixDisplay').textContent   = track.mix;
  }
}

// ── Contrôles ────────────────────────────────
function loadRandomTrack()   { loadTrack(Math.floor(Math.random() * tracks.length)); }
function loadNextTrack()     { loadTrack((currentIndex + 1) % tracks.length); }
function loadPreviousTrack() { loadTrack((currentIndex - 1 + tracks.length) % tracks.length); }
function openInYouTube() {
  const t = tracks[currentIndex];
  window.open(
    t ? 'https://www.youtube.com/watch?v=' + t.videoId : 'https://www.youtube.com/@RoboticDub',
    '_blank', 'noopener'
  );
}

// ── Recherche ─────────────────────────────────
function setupSearch() {
  const input = document.getElementById('playlistSearch');
  if (!input) return;
  input.addEventListener('input', () => {
    const term = input.value.toLowerCase().trim();
    const list = term
      ? tracks.filter(t =>
          t.title.toLowerCase().includes(term)   ||
          t.mix.toLowerCase().includes(term)     ||
          t.catalog.toLowerCase().includes(term))
      : tracks;
    renderPlaylist(list);
  });
}

function esc(s) {
  return String(s || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
