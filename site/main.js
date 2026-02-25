document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const trigger = nav ? nav.querySelector(".hamburger") : null;
  const links = nav ? nav.querySelector(".nav-links") : null;

  if (!nav || !trigger || !links) return;

  trigger.setAttribute("role", "button");
  trigger.setAttribute("tabindex", "0");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-label", "Toggle navigation menu");

  const closeMenu = () => {
    nav.classList.remove("nav-open");
    trigger.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = () => {
    const isOpen = nav.classList.toggle("nav-open");
    trigger.setAttribute("aria-expanded", String(isOpen));
  };

  trigger.addEventListener("click", toggleMenu);
  trigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMenu();
    }
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });
});
