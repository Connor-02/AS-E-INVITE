const page = document.querySelector('.invitation-page');
const hint = document.getElementById('openHint');
const titleCard = document.getElementById('titleCard');
const sparklesContainer = document.getElementById('sparkles');
const waxSeal = document.getElementById('waxSeal');

/* ── Background stars ──────────────────────────────── */

function generateStars() {
  const container = document.getElementById('stars');
  if (!container) { return; }

  const count = 110;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.cssText = [
      `left:${Math.random() * 100}%`,
      `top:${Math.random() * 100}%`,
      `--dur:${(2.5 + Math.random() * 4).toFixed(2)}s`,
      `--delay:${(Math.random() * 6).toFixed(2)}s`,
      `--brightness:${(0.3 + Math.random() * 0.55).toFixed(2)}`
    ].join(';');
    fragment.appendChild(star);
  }

  container.appendChild(fragment);
}

/* ── Gold sparkle burst ────────────────────────────── */

function burstSparkles() {
  if (!sparklesContainer || !waxSeal) { return; }

  const rect = waxSeal.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top  + rect.height / 2;
  const count = 18;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const dist  = 60 + Math.random() * 70;
    const tx    = Math.round(Math.cos(angle) * dist);
    const ty    = Math.round(Math.sin(angle) * dist);

    const p = document.createElement('span');
    p.className = 'sparkle';
    p.style.cssText = [
      `left:${cx}px`,
      `top:${cy}px`,
      `--tx:${tx}px`,
      `--ty:${ty}px`,
      `width:${4 + Math.random() * 5}px`,
      `height:${4 + Math.random() * 5}px`,
      `animation-delay:${(Math.random() * 0.12).toFixed(3)}s`,
      `animation-duration:${(0.7 + Math.random() * 0.4).toFixed(3)}s`
    ].join(';');

    sparklesContainer.appendChild(p);
    p.addEventListener('animationend', () => p.remove(), { once: true });
  }
}

/* ── Open invitation ───────────────────────────────── */

function openInvitation() {
  if (!page || page.classList.contains('opened')) { return; }

  page.classList.add('opened');

  burstSparkles();

  if (hint) {
    hint.style.opacity = '0';
    setTimeout(() => {
      hint.textContent = 'Welcome to our wedding celebration';
      hint.style.opacity = '1';
    }, 500);
  }

  if (titleCard) {
    setTimeout(() => {
      titleCard.classList.add('is-visible');
    }, 1200);
  }
}

/* ── Auto-open on load ─────────────────────────────── */

generateStars();

window.addEventListener('load', () => {
  setTimeout(openInvitation, 1800);
});
