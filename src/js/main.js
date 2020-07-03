import "../sass/main.scss";

let controller;
let slideScene;

function animateSlides() {
  //Init Controller
  controller = new ScrollMagic.Controller();
  //Select some things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector("nav");
  //Loop over the slides
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const desc = slide.querySelector(".hero-desc");

    //GSAP - Create a timeline
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(desc, { x: "200%" }, { x: "0%" }, "-=0.75");
    slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");

    //Create Scene to activate when scrolled
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.4,
      reverse: false,
    })
      .setTween(slideTl)
      .addIndicators({
        colorStart: "black",
        colorTrigger: "blue",
        name: "slide",
      })
      .addTo(controller);
    // New Animation
  });
}

//! ********  Cursor Animation ******/
const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");
const links = document.querySelectorAll(".nav-links li");

//! Animation for the nav links
links.forEach((link) => {
  link.addEventListener("mouseover", () => {
    mouse.classList.add("link-grow");
  });
  link.addEventListener("mouseleave", () => {
    mouse.classList.remove("link-grow");
  });
});

//! Function to move cursor
function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

function activeCursor(e) {
  const item = e.target;

  // Logo
  if (item.id === "logo") {
    mouse.classList.add("logo-active");
  } else {
    mouse.classList.remove("logo-active");
  }
  // img
  if (item.classList.contains("images")) {
    mouse.classList.add("blur");
  } else {
    mouse.classList.remove("blur");
  }

  // burger
  if (
    item.classList.contains("burger") ||
    item.classList.contains("line1") ||
    item.classList.contains("line2") ||
    item.classList.contains("line3")
  ) {
    mouse.classList.add("burger-active");
  } else {
    mouse.classList.remove("burger-active");
  }
  // explore btn
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    mouseTxt.innerText = "Explore!";
    // gsap.to(".title-swipe", 1, { y: "0%" });
    // gsap.fromTo(".fill", 0.1, { opacity: 1 }, { opacity: 0 });

    gsap.fromTo(".explore", 0.1, { opacity: 1 }, { opacity: 0 });
  } else {
    mouse.classList.remove("explore-active");
    mouseTxt.innerText = "";
    gsap.fromTo(".explore", 0.1, { opacity: 0 }, { opacity: 1 });
    // gsap.to(".title-swipe", 1, { y: "100%" });
  }
}

// Event listeners
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

//! ***************** Nav Slide ************** !//
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links li");
  const corp = document.querySelector("body");

  //! Toggle Nav
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    //! Animate Links
    links.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 2 + 0.3
        }s`;
      }
    });

    //! Burger Animation
    burger.classList.toggle("toggle");

    //! Body overflow and disappear
    corp.classList.toggle("over");
  });
};

navSlide();

//! ************* Barba Page Transitions ************** !//
const logo = document.querySelector("#logo");
const home = document.querySelector(".home-link");
const about = document.querySelector(".about-link");
const work = document.querySelector(".work-link");
const contact = document.querySelector(".contact-link");
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        logo.href = "./index.html";
        home.href = "./index.html";
        about.href = "./about.html";
        work.href = "./work.html";
        contact.href = "./contact.html";
      },
      beforeLeave() {
        slideScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "fashion",
      beforeEnter() {
        logo.href = "./index.html";
        home.href = "./index.html";
        about.href = "./about.html";
        work.href = "./work.html";
        contact.href = "./contact.html";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
    {
      namespace: "about",
      beforeEnter() {
        logo.href = "./index.html";
        home.href = "./index.html";
        about.href = "./about.html";
        work.href = "./work.html";
        contact.href = "./contact.html";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
    {
      namespace: "contact",
      beforeEnter() {
        logo.href = "./index.html";
        home.href = "./index.html";
        about.href = "./about.html";
        work.href = "./work.html";
        contact.href = "./contact.html";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
  ],
  transitions: [
    {
      // ! Leave
      leave({ current, next }) {
        let done = this.async();
        //An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          1,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.2"
        );
      },
      // ! Enter
      enter({ current, next }) {
        let done = this.async();
        //Scroll to the top
        window.scrollTo(0, 0);
        //An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(
          ".swipe",
          1,
          { x: "0%" },

          { x: "100%", stagger: 0.3, onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        tl.fromTo(
          ".nav-header",
          1,
          { y: "-100%" },
          { y: "0%", ease: "power2.inOut" },
          "-=1.5"
        );
      },
    },
  ],
});

let detailScene;

// ! Detail animation
function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(nextImg, { x: "50%" }, { x: "0%" });
    //Scene
    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "detailScene"
      // })
      .addTo(controller);
  });
}
