// Landing Slider
let currentSlide = 0;
const slides = [
  "images/landing.jpg",
  "images/header-bg.jpg", // Assuming another image, or use same for demo
  "images/quote.jpg",
];
const landing = document.querySelector(".landing");
const bullets = document.querySelectorAll(".bullets li");

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  landing.style.backgroundImage = `url(${slides[currentSlide]})`;
  updateBullets();
}

function setSlide(index) {
  currentSlide = index;
  landing.style.backgroundImage = `url(${slides[currentSlide]})`;
  updateBullets();
}

function updateBullets() {
  bullets.forEach((bullet, index) => {
    bullet.classList.toggle("active", index === currentSlide);
  });
}

document
  .querySelector(".fa-angle-left")
  .addEventListener("click", () => changeSlide(-1));
document
  .querySelector(".fa-angle-right")
  .addEventListener("click", () => changeSlide(1));
bullets.forEach((bullet, index) => {
  bullet.addEventListener("click", () => setSlide(index));
});

// Portfolio Shuffle
const shuffleItems = document.querySelectorAll(".shuffle li");
const portfolioBoxes = document.querySelectorAll(".imag-container .box");

shuffleItems.forEach((item) => {
  item.addEventListener("click", () => {
    shuffleItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    const category = item.textContent.toLowerCase();
    portfolioBoxes.forEach((box) => {
      if (category === "all" || box.dataset.category === category) {
        box.style.display = "block";
      } else {
        box.style.display = "none";
      }
    });
  });
});

// Add data-category to boxes (assuming categories)
portfolioBoxes.forEach((box, index) => {
  const categories = [
    "web design",
    "graphic design",
    "app development",
    "photography",
  ];
  box.dataset.category = categories[index % categories.length];
});

// Video Play
const video = document.getElementById("video");
const playBtn = document.querySelector(".link-video");

playBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (video.paused) {
    video.play();
    playBtn.innerHTML = '<i class="fas fa-pause fa-3x"></i>';
  } else {
    video.pause();
    playBtn.innerHTML = '<i class="fas fa-play fa-3x"></i>';
  }
});

// Mobile Menu Toggle
const toggleMenu = document.querySelector(".toggle-menu");
const navUl = document.querySelector("header nav ul");

toggleMenu.addEventListener("click", () => {
  navUl.classList.toggle("show");
});

// Stats Counter Animation
const statsSection = document.querySelector(".stats");
const statsNumbers = document.querySelectorAll(".stats .number");

function animateNumbers() {
  statsNumbers.forEach((num) => {
    const target = +num.textContent.replace(",", "");
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        num.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        num.textContent = Math.floor(current).toLocaleString();
      }
    }, 30);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateNumbers();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(statsSection);

// Smooth Scroll for Nav Links
document.querySelectorAll("header nav ul li a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile menu
    navUl.classList.remove("show");
  });
});

// Sticky Header
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(
  ".service-box, .plan-box, .box, .main-heading, .landing .text, .design .text, .video .text, .contact-form, .info-item, .blog-post"
);

// Initial state
revealElements.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => revealObserver.observe(el));
