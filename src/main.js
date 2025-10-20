import "./style.css";
const navLinks = document.querySelector(".nav-links");

document.getElementById("menu-toggle").addEventListener("click", function (e) {
  e.target.name =
    e.target.name === "menu-outline" ? "close-outline" : "menu-outline";
  navLinks.classList.toggle("top-[11%]");
});

const images = ["masaz.jpeg", "masaz2.jpg", "masaz3.jpg"];
let current = 0;
const hero = document.getElementById("hero");

setInterval(() => {
  current = (current + 1) % images.length;
  hero.style.backgroundImage = `url('${images[current]}')`;
}, 5000);
