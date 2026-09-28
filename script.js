/* =========================================================
   SCRIPT.JS - Halaman Maintenance DPUPR
   Tanpa library eksternal.
   ========================================================= */

/* 1. Tahun footer otomatis mengikuti tahun saat ini */
document.getElementById('year').textContent = new Date().getFullYear();

/* 2. Efek reveal: elemen .reveal muncul satu per satu saat halaman dimuat */
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('show'), 120 * i); // jeda 120ms antar elemen
  });
});

/* 3. Menu mobile (hamburger) */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
navMenu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navMenu.classList.remove('open'))
);

/* 4. Fallback logo: jika assets/logo.png belum ada, tampilkan badge "PU" */
const logo = document.getElementById('brandLogo');
const fallback = document.getElementById('brandFallback');
function showFallbackLogo() { logo.hidden = true; fallback.hidden = false; }
logo.addEventListener('error', showFallbackLogo);
if (logo.complete && logo.naturalWidth === 0) showFallbackLogo();

/* 5. Teks status maintenance berganti otomatis (tanpa persentase palsu) */
const statusText = document.getElementById('statusText');
const messages = [
  'Memeriksa sistem…',
  'Memperbarui konten…',
  'Mengoptimalkan performa…',
  'Menguji keamanan…'
];
let msgIndex = 0;
setInterval(() => {
  statusText.style.opacity = 0;
  setTimeout(() => {
    msgIndex = (msgIndex + 1) % messages.length;
    statusText.textContent = messages[msgIndex];
    statusText.style.opacity = .8;
  }, 300);
}, 3200);
statusText.style.transition = 'opacity .3s';

/* 6. Animasi background: partikel halus di <canvas> */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Jumlah partikel menyesuaikan lebar layar (lebih sedikit di HP)
  const count = Math.min(70, Math.floor(canvas.width / 22));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + .6,           // ukuran
    vx: (Math.random() - .5) * .3,       // kecepatan horizontal
    vy: -(Math.random() * .35 + .1),     // naik pelan-pelan
    a: Math.random() * .4 + .15          // transparansi
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; } // muncul lagi dari bawah
    if (p.x < -5) p.x = canvas.width + 5;
    if (p.x > canvas.width + 5) p.x = -5;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.a})`;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) drawParticles();
