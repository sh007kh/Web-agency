const navLinks = document.querySelector(".nav-links");
const navBtn = document.querySelectorAll(".nav-btn");
const navBtnContainer = document.querySelector(".nav-btn-container");
navBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    navLinks.classList.toggle("show-links");
    navBtnContainer.classList.toggle("show-btn");
  });
});
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) navLinks.classList.remove("show-links");
  if (window.innerWidth > 768) navBtnContainer.classList.remove("show-btn");
});
