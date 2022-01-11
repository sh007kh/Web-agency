const navLinks = document.querySelector(".nav-links");
const navBtn = document.querySelectorAll(".nav-btn");
const navBtnContainer = document.querySelector(".nav-btn-container");
navBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    navLinks.classList.toggle("show-links");
    navBtnContainer.classList.toggle("show-btn");
  });
});
