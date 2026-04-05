// Rolagem suave (Lenis) — declarado primeiro
const lenis = new Lenis({
  duration: 2.0,
  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  smooth: false,
  smoothTouch: false,
});

function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

function lockScroll()   { lenis.stop(); }
function unlockScroll() { lenis.start(); }

// Typewriter
const app = document.getElementById("app");
const typewriter = new Typewriter(app, { loop: true, delay: 90 });

typewriter
  .typeString(`<span style="-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);background-color:rgba(255,255,255,.15);border-radius:.375rem;">Transformando Pele em Arte.</span>`)
  .pauseFor(2000)
  .deleteAll()
  .typeString(`<span style="-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);background-color:rgba(255,255,255,.15);border-radius:.375rem;">Borges Tattoo!</span>`)
  .pauseFor(1000)
  .start();

// Partículas
document.addEventListener("DOMContentLoaded", function () {
  particlesJS("particles-js", {
    particles: {
      number: { value: 50, density: { enable: false, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
      opacity: { value: 0.5, random: false, anim: { enable: false } },
      size: { value: 3, random: true, anim: { enable: false } },
      line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out" },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 1 } },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  });
});

// Carrossel do Portfólio
const cards = document.querySelector(".cards");
const wrapper = document.querySelector(".cards-wrapper");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;

function updateCarousel(direction) {
  const card = cards.querySelector("img");
  const cardWidth = card.offsetWidth + 16;
  const visibleCount = Math.floor(wrapper.offsetWidth / cardWidth);
  const maxIndex = cards.children.length - visibleCount;

  if (direction === "next" && currentIndex < maxIndex) currentIndex++;
  if (direction === "prev" && currentIndex > 0) currentIndex--;

  cards.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

nextBtn.addEventListener("click", () => updateCarousel("next"));
prevBtn.addEventListener("click", () => updateCarousel("prev"));

// Lightbox de imagem
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxWrapper = document.getElementById("lightbox-img-wrapper");
const lightboxClose = document.getElementById("lightbox-close");

document.querySelectorAll(".cards img").forEach(img => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxImg.classList.remove("zoomed");
    lightboxWrapper.classList.remove("zoomed");
    lightbox.classList.add("active");
    lockScroll();
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  unlockScroll();
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
lightboxWrapper.addEventListener("click", () => {
  lightboxImg.classList.toggle("zoomed");
  lightboxWrapper.classList.toggle("zoomed");
});

// Carrossel da Equipe
const teamTrack = document.querySelector(".team-track");
const teamDots = document.querySelectorAll(".team-dot");
let teamIndex = 0;

function goToMember(index) {
  teamIndex = index;
  teamTrack.style.transform = `translateX(-${teamIndex * 100}%)`;
  teamDots.forEach((d, i) => d.classList.toggle("active", i === teamIndex));
}

let teamAutoplay = setInterval(() => goToMember((teamIndex + 1) % teamDots.length), 5000);

function resetTeamAutoplay() {
  clearInterval(teamAutoplay);
  teamAutoplay = setInterval(() => goToMember((teamIndex + 1) % teamDots.length), 5000);
}

document.querySelector(".team-next").addEventListener("click", () => { goToMember((teamIndex + 1) % teamDots.length); resetTeamAutoplay(); });
document.querySelector(".team-prev").addEventListener("click", () => { goToMember((teamIndex - 1 + teamDots.length) % teamDots.length); resetTeamAutoplay(); });
teamDots.forEach((dot, i) => dot.addEventListener("click", () => { goToMember(i); resetTeamAutoplay(); }));

// Lightbox de vídeo
const videoLightbox = document.getElementById("video-lightbox");
const videoLightboxPlayer = document.getElementById("video-lightbox-player");
const videoLightboxClose = document.getElementById("video-lightbox-close");

document.getElementById("about-video-thumb").addEventListener("click", () => {
  videoLightbox.classList.add("active");
  videoLightboxPlayer.play();
  lockScroll();
});

function closeVideoLightbox() {
  videoLightbox.classList.remove("active");
  videoLightboxPlayer.pause();
  unlockScroll();
}

videoLightboxClose.addEventListener("click", closeVideoLightbox);
videoLightbox.addEventListener("click", e => { if (e.target === videoLightbox) closeVideoLightbox(); });

document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closeLightbox(); closeVideoLightbox(); }
});

// Menu hamburguer mobile
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("header > nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
  isOpen ? lockScroll() : unlockScroll();
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.classList.remove("open");
    document.body.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", false);
    unlockScroll();
  });
});
