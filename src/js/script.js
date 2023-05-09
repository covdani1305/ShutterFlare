"use strict";

// SLIDER
const slides = document.querySelectorAll(".slide");

let curSlide = 0;
const nextSlide = document.querySelector(".btn-next");
const prevSlide = document.querySelector(".btn-prev");
let maxSlide = slides.length - 1;

slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

nextSlide.addEventListener("click", function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
    slides[maxSlide].classList.remove("slide-active");
  } else {
    curSlide++;
  }

  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });

  slides[curSlide].classList.add("slide-active");
  if (slides[curSlide - 1])
    slides[curSlide - 1].classList.remove("slide-active");
});

prevSlide.addEventListener("click", function () {
  // check if current slide is the first and reset current slide to last
  if (curSlide === 0) {
    curSlide = maxSlide;
    slides[0].classList.remove("slide-active");
  } else {
    curSlide--;
  }

  //   move slide by 100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
  slides[curSlide].classList.add("slide-active");
  if (slides[curSlide + 1])
    slides[curSlide + 1].classList.remove("slide-active");
});
/////////////////////////////////////////////

// SMOOTH SCROLLING

const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    if (href == "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      const yOffset = -100;
      // sectionEl.scrollIntoView({ behavior: "smooth"});
      const y =
        sectionEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    // Wait for the scroll animation to finish

    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});
///////////////////////////////////////////////////////////
// MOBILE NAV
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-50px",
  }
);
obs.observe(sectionHeroEl);

//  if (!entry.isIntersecting) {
//    navbar.classList.add("sticky");
//  } else {
//    navbar.classList.remove("sticky");
//  }
////////////////////////////////////////

// FORM SUBMIT

const form = document.querySelector(".CTA-form");
let fullName = document.querySelector(".name");
let email = document.querySelector(".cta-email");
let phone = document.querySelector(".phone");
const inputs = document.querySelectorAll(".cta-item");
const parentElement = document.querySelector(".call-to-action");

const clearInputs = function () {};

const renderMarkup = function (className, icon, msg, timeout) {
  const markup = `<div class='${className}'>
          <img
            class="error-icon"
            src="./src/img/icons/${icon}-icon.svg"
            alt=""
          />
          <span>${msg}</span>
        </div>`;
  parentElement.insertAdjacentHTML("afterbegin", markup);
  const addClass = document.querySelector(`.${className}`);
  setTimeout(() => addClass.classList.add("active"), 0);
  setTimeout(() => addClass.classList.remove("active"), `${timeout}`);
};
const renderError = function () {
  renderMarkup("error", "error", "Invalid inputs!", 1000);
};

const renderSuccessMsg = function () {
  renderMarkup(
    "success",
    "success",
    "We'll get in touch with you shortly",
    2000
  );
};

const submitForm = function () {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (fullName.value && email.value && phone.value) {
      renderSuccessMsg();
      clearInputs();
    } else {
      renderError();
      clearInputs();
    }
  });
};
submitForm();
