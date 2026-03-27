// ============================================
// ROBOTIC DUB — discography.js v3
// Fix erreur 153 : lightbox YouTube nocookie
// ============================================

let allEmbedsActive = false;

document.addEventListener('DOMContentLoaded', () => {
  setupSearch();
  setupFilters();
  initLazyThumbnails();
  createLightbox();
});

// ── Lightbox ───────────────────────────────
function createLightbox() {
  const lb = document.createElement('div');
  lb.id = 'yt-lightbox';
  lb.style.cssText = [
    'display:none',
    'position:fixed',
    'inset:0',
    'z-index:9999',
    'background:rgba(0,0,0,.88)',
    'align-items:center',
    'justify-content:center',
    'cursor:pointer'
  ].join(';');

  lb.innerHTML = `
    <div id="yt-lb-inner" style="position:relative;width:min(900px,94vw);aspect-ratio:16/9;cursor:default;">
      <iframe id="yt-lb-iframe"
        style="width:100%;height:100%;border:none;border-radius:8px;"
        allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
        allowfullscreen></iframe>
      <button id="yt-lb-close"
        style="position:absolute;top:-42px;right:0;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;line-height:1;padding:4px 10px;"
        aria-label="Fermer">&times;</button>
    </div>`;
  document.body.appendChild(lb);

  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.getElementById('yt-lb-close').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

function openLightbox(videoId) {
  const lb     = document.getElementById('yt-lightbox');
  const iframe = document.getElementById('yt-lb-iframe');
  // youtube-nocookie + autoplay=1 corrige l'erreur 153
  iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1';
  lb.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb     = document.getElementById('yt-lightbox');
  const iframe = document.getElementById('yt-lb-iframe');
  lb.style.display = 'none';
  iframe.src = '';
  document.body.style.overflow = '';
}

// ── Clic sur une carte ─────────────────────
function loadVideo(visual, videoId) {
  openLightbox(videoId);
}

// ── Toggle toutes les vidéos → YT channel ──
function toggleAllEmbeds() {
  window.open('https://www.youtube.com/@RoboticDub/videos', '_blank', 'noopener');
}

// ── Lazy-load miniatures HD ────────────────
function initLazyThumbnails() {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      const vid = img.dataset.vid;
      if (!vid) { obs.unobserve(img); return; }
      const hd = new Image();
      hd.onload  = () => { img.src = 'https://img.youtube.com/vi/' + vid + '/hqdefault.jpg'; };
      hd.onerror = () => { img.src = 'https://img.youtube.com/vi/' + vid + '/mqdefault.jpg'; };
      hd.src = 'https://img.youtube.com/vi/' + vid + '/hqdefault.jpg';
      obs.unobserve(img);
    });
  }, { rootMargin: '200px' });
  document.querySelectorAll('.track-thumbnail[data-vid]').forEach(img => obs.observe(img));
}

// ── Recherche ──────────────────────────────
function setupSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.addEventListener('input', () => {
    const term = input.value.toLowerCase().trim();
    document.querySelectorAll('.track-card').forEach(card => {
      const match = !term
        || (card.dataset.title   || '').includes(term)
        || (card.dataset.catalog || '').includes(term)
        || card.textContent.toLowerCase().includes(term);
      card.style.display = match ? '' : 'none';
    });
  });
}

// ── Filtres par année / tag ────────────────
function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.year);
    });
  });
}

function applyFilter(value) {
  document.querySelectorAll('.year-section').forEach(section => {
    const cards = section.querySelectorAll('.track-card');

    if (value === 'all') {
      section.style.display = '';
      cards.forEach(c => c.style.display = '');
      return;
    }

    if (value === 'free' || value === 'compilation') {
      let anyVisible = false;
      cards.forEach(card => {
        const show = card.classList.contains(value);
        card.style.display = show ? '' : 'none';
        if (show) anyVisible = true;
      });
      section.style.display = anyVisible ? '' : 'none';
      return;
    }

    if (section.dataset.year === value) {
      section.style.display = '';
      cards.forEach(c => c.style.display = '');
    } else {
      section.style.display = 'none';
    }
  });
}

// ── Recherche YouTube pour tracks sans vidéo dédiée ──
function searchYouTube(query) {
  window.open('https://www.youtube.com/results?search_query=Robotic+Dub+' + encodeURIComponent(query), '_blank', 'noopener');
}
