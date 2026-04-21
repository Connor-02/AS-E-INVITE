const page = document.querySelector('.invitation-page');
const openEnvelopeButton = document.getElementById('openEnvelope');
const hint = document.getElementById('openHint');
const targetDate = new Date('2027-09-18T16:30:00').getTime();

const countdownRefs = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

function updateCountdown() {
  const now = Date.now();
  const remaining = Math.max(targetDate - now, 0);

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  countdownRefs.days.textContent = String(days).padStart(2, '0');
  countdownRefs.hours.textContent = String(hours).padStart(2, '0');
  countdownRefs.minutes.textContent = String(minutes).padStart(2, '0');
  countdownRefs.seconds.textContent = String(seconds).padStart(2, '0');
}

function openInvitation() {
  if (page.classList.contains('opened')) {
    return;
  }

  page.classList.add('opened');
  hint.textContent = 'Welcome to our wedding celebration';

  setTimeout(() => {
    document.getElementById('details').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 900);
}

openEnvelopeButton.addEventListener('click', openInvitation);
openEnvelopeButton.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openInvitation();
  }
});

updateCountdown();
setInterval(updateCountdown, 1000);
