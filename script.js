(function () {
  "use strict";

  /* Mobile nav */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Lightbox */
  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  var lightbox = document.getElementById("lightbox");
  if (!lightbox || !items.length) return;

  var lbImg = lightbox.querySelector(".lightbox-img");
  var lbCap = lightbox.querySelector(".lightbox-caption");
  var btnClose = lightbox.querySelector(".lightbox-close");
  var btnPrev = lightbox.querySelector(".lightbox-prev");
  var btnNext = lightbox.querySelector(".lightbox-next");
  var index = 0;

  function openAt(i) {
    index = (i + items.length) % items.length;
    var el = items[index];
    var full = el.getAttribute("data-full") || el.querySelector("img").src;
    var cap = el.getAttribute("data-caption") || "";
    lbImg.src = full;
    lbImg.alt = cap;
    lbCap.textContent = cap;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    btnClose.focus();
  }

  function closeLb() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lbImg.removeAttribute("src");
  }

  items.forEach(function (el, i) {
    el.addEventListener("click", function () { openAt(i); });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openAt(i);
      }
    });
  });

  btnClose.addEventListener("click", closeLb);
  btnPrev.addEventListener("click", function () { openAt(index - 1); });
  btnNext.addEventListener("click", function () { openAt(index + 1); });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLb();
  });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowRight") openAt(index - 1); /* RTL: right = previous visually */
    if (e.key === "ArrowLeft") openAt(index + 1);
  });
})();
