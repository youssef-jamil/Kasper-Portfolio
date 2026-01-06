// Landing Slider
let currentSlide = 0;
const slides = [
  "images/landing.jpg",
  "images/header-bg.jpg", // Ensure these images exist or use fallback
  "images/quote.jpg",
];
const landing = document.querySelector(".landing");
const bullets = document.querySelectorAll(".bullets li");

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  updateSlide();
}

function setSlide(index) {
  currentSlide = index;
  updateSlide();
}

function updateSlide() {
  if (landing) {
    landing.style.backgroundImage = `url(${slides[currentSlide]})`;
    updateBullets();
  }
}

function updateBullets() {
  bullets.forEach((bullet, index) => {
    bullet.classList.toggle("active", index === currentSlide);
  });
}

// Event Listeners for Slider
const leftArrow = document.querySelector(".fa-angle-left");
const rightArrow = document.querySelector(".fa-angle-right");

if (leftArrow) leftArrow.addEventListener("click", () => changeSlide(-1));
if (rightArrow) rightArrow.addEventListener("click", () => changeSlide(1));

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
    const category = item.textContent.trim().toLowerCase();
    portfolioBoxes.forEach((box) => {
      // Assuming data-category is set, or inferred from image/text
      // For demo purposes, we will rely on data-category or show all
      if (
        category === "all" ||
        box.dataset.category.toLowerCase() === category
      ) {
        box.style.display = "block";
        setTimeout(() => {
          box.style.opacity = "1";
          box.style.transform = "scale(1)";
        }, 10);
      } else {
        box.style.display = "none";
        box.style.opacity = "0";
        box.style.transform = "scale(0.8)";
      }
    });
  });
});

// Add data-category to boxes (Mocking categories for demo if not present)
portfolioBoxes.forEach((box, index) => {
  if (!box.dataset.category) {
    const categories = [
      "web design",
      "graphic design",
      "app development",
      "photography",
    ];
    box.dataset.category = categories[index % categories.length];
  }
});

// Video Play
const video = document.getElementById("video");
const playBtn = document.querySelector(".link-video");

if (playBtn && video) {
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
}

// Mobile Menu Toggle
const toggleMenu = document.querySelector(".toggle-menu");
const navUl = document.querySelector("header nav ul");

if (toggleMenu && navUl) {
  toggleMenu.addEventListener("click", () => {
    navUl.classList.toggle("show");
  });
}

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    navUl &&
    navUl.classList.contains("show") &&
    !e.target.closest("header nav")
  ) {
    navUl.classList.remove("show");
  }
});

// Stats Counter Animation (requestAnimationFrame)
const statsSection = document.querySelector(".stats");
const statsNumbers = document.querySelectorAll(".stats .number");
let started = false; // Function Started ? No

function startCount(el) {
  const goal = parseInt(el.textContent.replace(/,/g, ""), 10);
  let count = 0;
  const duration = 2000; // 2 seconds
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out function
    const easeOut = 1 - Math.pow(1 - progress, 3);

    count = Math.floor(easeOut * goal);
    el.textContent = count.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.textContent = goal.toLocaleString();
    }
  }

  requestAnimationFrame(updateCount);
}

if (statsSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !started) {
        statsNumbers.forEach((num) => startCount(num));
        started = true;
      }
    },
    { threshold: 0.5 }
  );
  observer.observe(statsSection);
}

// Smooth Scroll for Nav Links
document.querySelectorAll("header nav ul li a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");
    if (href === "#") return;
    const targetId = href.substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile menu
    if (navUl) navUl.classList.remove("show");
  });
});

// Sticky Header & Back to Top (Throttled)
const header = document.querySelector("header");
const toTop = document.querySelector(".to-top");
let lastScrollY = window.scrollY;
let ticking = false;

function onScroll() {
  lastScrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll(lastScrollY);
      ticking = false;
    });
    ticking = true;
  }
}

function handleScroll(scrollY) {
  // Sticky Header
  if (scrollY > 100) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }

  // Back to Top button
  if (toTop) {
    if (scrollY > 500) {
      toTop.classList.add("active");
    } else {
      toTop.classList.remove("active");
    }
  }
}

window.addEventListener("scroll", onScroll);

// Back to Top Click
if (toTop) {
  toTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(
  ".service-box, .plan-box, .box, .main-heading, .landing .text, .design .text, .video .text, .contact-form, .info-item, .blog-post"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Optional: Stop observing once revealed
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

revealElements.forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});
