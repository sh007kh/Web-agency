const navLinks = document.querySelector(".nav-links");
const navLink = document.querySelectorAll(".nav-link");
const navBtn = document.querySelectorAll(".nav-btn");
const navBar = document.querySelector(".navbar");
const navBtnContainer = document.querySelector(".nav-btn-container");
// nav-btn toggle
navBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    navLinks.classList.toggle("show-links");
    navBtnContainer.classList.toggle("show-btn");
  });
});
// close nav-links
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) navLinks.classList.remove("show-links");
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
navLink.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("show-links");
    navBtnContainer.classList.toggle("show-btn");
  });
});
