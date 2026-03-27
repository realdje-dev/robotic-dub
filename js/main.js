// ============================================
// ROBOTIC DUB — main.js v2
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initStats();
  loadLatestReleases();
});

// ── Mobile navigation ──────────────────────
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu   = document.querySelector('.nav-menu');
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('active');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close on nav link click (mobile)
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('open');
    });
  });
}

// ── Counter animation ──────────────────────
function initStats() {
  document.querySelectorAll('.stat-number[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    animateCounter(el, target);
  });
}

function animateCounter(el, target) {
  const duration = 1200;
  const start    = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target) + (progress === 1 ? '+' : '');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ── Latest releases (uses tracks.json) ────
async function loadLatestReleases() {
  const container = document.getElementById('latestReleases');
  if (!container) return;

  try {
    // Path relative to index.html in project root
    const res  = await fetch('data/tracks.json');
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();

    // Last 6 tracks (highest IDs = most recent)
    const latest = [...data.tracks]
      .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
      .slice(0, 6);

    container.innerHTML = latest.map(t => {
      const date = new Date(t.releaseDate).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
      return `
        <div class="release-card">
          <h3>${escHtml(t.title)}</h3>
          <p>${escHtml(t.mix)}</p>
          <p class="release-catalog">${escHtml(t.catalog)}</p>
          <p class="release-date">${date}</p>
        </div>`;
    }).join('');

  } catch (err) {
    container.innerHTML = '<p style="color:var(--fg-muted);font-size:.8rem;">Impossible de charger les sorties.</p>';
    console.warn('loadLatestReleases:', err);
  }
}

// ── HTML escape helper ─────────────────────
function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
