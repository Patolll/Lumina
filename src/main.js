import "./style.css";

// aos initlialization

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

// mobile menu toggle
const navLinks = document.querySelector(".nav-links");
document.getElementById("menu-toggle").addEventListener("click", function (e) {
  e.target.name =
    e.target.name === "menu-outline" ? "close-outline" : "menu-outline";
  navLinks.classList.toggle("top-[11%]");
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
