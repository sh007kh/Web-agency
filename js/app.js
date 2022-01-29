const navLinksContainer = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-link");
const navBtn = document.querySelectorAll(".nav-btn");
const navBar = document.querySelector(".navbar");
const navBtnContainer = document.querySelector(".nav-btn-container");

const postContainer = document.querySelectorAll(".post");
const sliderLeft = document.querySelector(".slider-left");
const sliderRight = document.querySelector(".slider-right");
// nav-btn toggle
navBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    navLinksContainer.classList.toggle("show-links");
    navBtnContainer.classList.toggle("show-btn");
  });
});
// close nav-links
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) navLinksContainer.classList.remove("show-links");
  if (window.innerWidth > 768) navBtnContainer.classList.remove("show-btn");
});
// fixed navbar
window.addEventListener("scroll", function () {
  if (window.scrollY > 80) {
    navBar.classList.add("fixed-navbar");
  } else {
    navBar.classList.remove("fixed-navbar");
  }
});
// close navbar after click on link
navLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    // prevent default
    e.preventDefault();
    navLinksContainer.classList.remove("show-links");
    navBtnContainer.classList.remove("show-btn");

    const id = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    if (window.innerWidth < 768) {
      if (navBar.classList.contains("fixed-navbar")) {
        let position = element.offsetTop - 88;
        windowScroll(position);
      } else {
        let position = element.offsetTop - 168;
        windowScroll(position);
      }
    }
    if (window.innerWidth > 768) {
      if (navBar.classList.contains("fixed-navbar")) {
        let position = element.offsetTop - 80;
        windowScroll(position);
      } else {
        let position = element.offsetTop - 160;
        windowScroll(position);
      }
    }
  });
});
function windowScroll(position) {
  window.scrollTo({
    left: 0,
    top: position,
    behavior: "smooth",
  });
}
// slider
postContainer.forEach(function (post, index) {
  post.style.left = `${index * 100}%`;
});
let counter = 0;
sliderLeft.addEventListener("click", function () {
  counter--;
  if (counter < 0) {
    counter = 2;
  }

  postContainer.forEach(function (post) {
    post.style.transform = `translateX(-${counter * 100}%)`;
  });
  console.log(`left ${counter}`);
});
sliderRight.addEventListener("click", function () {
  counter++;
  if (counter > 2) {
    counter = 0;
  }
  postContainer.forEach(function (post) {
    post.style.transform = `translateX(-${counter * 100}%)`;
    console.log(`right ${counter}`);
  });
});
