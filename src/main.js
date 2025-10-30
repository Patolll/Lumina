import "./style.css";

// aos initlialization

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

// mobile menu toggle
const navLinks = document.querySelector(".nav-links");
const toggleBtn = document.getElementById("menu-toggle");

toggleBtn.addEventListener("click", (e) => {
  e.target.name =
    e.target.name === "menu-outline" ? "close-outline" : "menu-outline";
  navLinks.classList.toggle("top-[10%]");
});

// Hero slider
const images = ["masaz.jpeg", "masaz2.jpg", "masaz3.jpg"];
let current = 0;
const hero = document.getElementById("hero");

// Lazy loading za pomocą Intersection Observer
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        hero.style.backgroundImage = `url('${images[current]}')`;
        observer.unobserve(hero);

        // Zmieniaj obraz co kilka sekund (np. slider)
        setInterval(() => {
          current = (current + 1) % images.length;
          hero.style.backgroundImage = `url('${images[current]}')`;
        }, 4000); // zmiana co 4 sekundy
      }
    });
  },
  { threshold: 0.1 }
);
observer.observe(hero);

// faq toggle
document.querySelectorAll(".faq-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector("span");
    const isOpen = !content.classList.contains("hidden");

    if (isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
      requestAnimationFrame(() => {
        content.style.maxHeight = "0";
        content.classList.add("opacity-0");
      });
      setTimeout(() => {
        content.classList.add("hidden");
      }, 500);
      icon.textContent = "+";
    } else {
      content.classList.remove("hidden");
      content.style.maxHeight = "0";
      requestAnimationFrame(() => {
        content.classList.remove("opacity-0");
        content.style.maxHeight = content.scrollHeight + "px";
      });
      setTimeout(() => {
        content.style.maxHeight = "none";
      }, 500);
      icon.textContent = "–";
    }
  });
});

const slider = document.getElementById("opinie-slider");
const sliderItems = slider.children;
let currentIndex = 0;
let autoSlideInterval;

// Funkcja pokazująca dany slajd
function showSlide(index) {
  const screenWidth = window.innerWidth;
  let itemsPerView = 1;

  if (screenWidth >= 1024) itemsPerView = 3;
  else if (screenWidth >= 640) itemsPerView = 2;

  const offset = index * (sliderItems[0].offsetWidth + 24); // szerokość + gap
  slider.style.transform = `translateX(-${offset}px)`;
}

// Funkcja do przejścia do następnego slajdu
function nextSlide() {
  const screenWidth = window.innerWidth;
  let itemsPerView = 1;
  if (screenWidth >= 1024) itemsPerView = 3;
  else if (screenWidth >= 640) itemsPerView = 2;

  const maxIndex = sliderItems.length - itemsPerView;
  currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
  showSlide(currentIndex);
}

// Start automatycznego przesuwania
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 10000);
}

// Zatrzymanie automatycznego przesuwania
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Obsługa przycisków
document.getElementById("prev-opinie").addEventListener("click", () => {
  currentIndex = Math.max(currentIndex - 1, 0);
  showSlide(currentIndex);
});
document.getElementById("next-opinie").addEventListener("click", nextSlide);

// Zatrzymywanie automatycznego przesuwania przy najechaniu lub dotyku
slider.addEventListener("mouseenter", stopAutoSlide);
slider.addEventListener("mouseleave", startAutoSlide);
slider.addEventListener("touchstart", stopAutoSlide);
slider.addEventListener("touchend", startAutoSlide);

// Aktualizacja przy zmianie rozmiaru ekranu
window.addEventListener("resize", () => {
  showSlide(currentIndex);
});

// Pokazanie pierwszego widoku i start slidera
showSlide(currentIndex);
startAutoSlide();
