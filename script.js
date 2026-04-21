const page = document.querySelector('.invitation-page');
const hint = document.getElementById('openHint');
const details = document.getElementById('details');
const rsvpButton = document.getElementById('rsvpButton');
const sparklesContainer = document.getElementById('sparkles');
const waxSeal = document.getElementById('waxSeal');
const targetDate = new Date('2027-09-18T16:30:00').getTime();

const countdownRefs = {
  days:    document.getElementById('days'),
  hours:   document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

/* ── Countdown ─────────────────────────────────────── */

function updateCountdown() {
  if (!countdownRefs.days || !countdownRefs.hours || !countdownRefs.minutes || !countdownRefs.seconds) {
    return;
  }

  const remaining = Math.max(targetDate - Date.now(), 0);
  const days    = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  countdownRefs.days.textContent    = String(days).padStart(2, '0');
  countdownRefs.hours.textContent   = String(hours).padStart(2, '0');
  countdownRefs.minutes.textContent = String(minutes).padStart(2, '0');
  countdownRefs.seconds.textContent = String(seconds).padStart(2, '0');
}

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

  setTimeout(() => {
    if (details) {
      details.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 1400);
}

/* ── Auto-open on load ─────────────────────────────── */

generateStars();
updateCountdown();
setInterval(updateCountdown, 1000);

window.addEventListener('load', () => {
  setTimeout(openInvitation, 2500);
});

/* ── RSVP ──────────────────────────────────────────── */

if (rsvpButton) {
  rsvpButton.addEventListener('click', () => {
    window.location.href = 'mailto:rsvp@auroraandelias.com?subject=Wedding%20RSVP';
  });
}
