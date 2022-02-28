const navLinksContainer = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-link");
const navBtn = document.querySelectorAll(".nav-btn");
const navBar = document.querySelector(".navbar");
const navBtnContainer = document.querySelector(".nav-btn-container");

const postContainer = document.querySelectorAll(".post");
const sliderLeft = document.querySelector(".slider-left");
const sliderRight = document.querySelector(".slider-right");
const loginBtn = document.querySelector(".login-btn");
const loginCloseBtn = document.querySelectorAll("#form-close-btn");
// ======== event listeners =========
// login button
loginBtn.addEventListener("click", function () {
  formCenter.classList.remove("show-form");
});
loginCloseBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    formCenter.classList.add("show-form");
  });
});
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
// ****** SELECT ITEMS **********
const loginForm = document.querySelector(".login");
const signUpForm = document.querySelector(".sign-up");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const submitBtn = document.querySelector(".submit-btn");
const alert = document.querySelector(".alert");
const alertContainer = document.querySelector(".alert-container");
const signUpBtns = document.querySelectorAll(".sign-up-btn");
const formCenter = document.querySelector(".form-center");

// edit option
// ============
// loginform
// ============
// ****** EVENT LISTENERS **********
window.addEventListener("DOMContentLoaded", setupItems);

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const usernameHolder = this.username.value;
  console.log(`username is ${usernameHolder}`);
  const passwordHolder = this.password.value;
  console.log(`password is ${passwordHolder}`);
  if (validateLocalStorage(usernameHolder, passwordHolder)) {
    alertStore(processAlert("successfully signed in ", "green"));
  } else {
    console.log("error");
  }
  alertContainer.innerHTML = alertArray.join("");
  setToDefault();
});
signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("clicked");
  const usernameHolder = this.username.value;
  console.log(`username is ${usernameHolder}`);
  const emailHolder = this.email.value;
  console.log(`email is ${emailHolder}`);
  const passwordHolder = this.password.value;
  console.log(`password is ${passwordHolder}`);
  // checkLocalStorage(usernameHolder, passwordHolder);
  if (checkLocalStorage(usernameHolder, emailHolder)) {
    alertStore(processAlert("username already existed ", "red"));
    console.log("username already existed ");
  } else if (checkEmailLocalStorage(emailHolder)) {
    console.log("email already existed ");
  } else if (passwordHolder.includes(usernameHolder)) {
    alertStore(processAlert("password should not contain 'username'", "red"));
  } else if (passwordHolder.includes(" ")) {
    alertStore(processAlert("password should not contain space", "red"));
  } else if (passwordHolder.length < 8) {
    alertStore(processAlert("password should be at least 8 character", "red"));
  } else if (!hasLowerCase(passwordHolder)) {
    alertStore(processAlert("password should contain lowercase", "red"));
  } else if (!hasUpperCase(passwordHolder)) {
    alertStore(processAlert("password should contain uppercase", "red"));
  } else if (!hasNumber(passwordHolder)) {
    alertStore(
      processAlert("password should contain at least a number", "red")
    );
  } else {
    addToLocalStorage(usernameHolder, passwordHolder, emailHolder);
    alertStore(processAlert("your sign up completed succsefully ", "green"));
  }
  signUpForm.querySelector(".alert-container").innerHTML = alertArray.join("");
  setToDefault();
});

// signup button
signUpBtns.forEach(function (signUpBtn) {
  signUpBtn.addEventListener("click", function () {
    formCenter.classList.toggle("form-rotate");
  });
});
// ****** FUNCTIONS **********
function setToDefault() {
  alertArray = [];
  // this.username.value = "";
  // this.password.value = "";
}
function hasLowerCase(str) {
  return str.toUpperCase() != str;
}
function hasUpperCase(str) {
  return str.toLowerCase() != str;
}
function hasNumber(str) {
  return /\d/.test(str);
}
// display alert
function processAlert(text, item) {
  return `<p class="alert alert-${item}">${text}</p>`;
}
let alertArray = [];
function alertStore(processAlert) {
  alertArray.push(processAlert);
}

// ****** LOCAL STORAGE **********
// add to local storage
function addToLocalStorage(username, password, email) {
  const user = { username, password, email };
  let items = getFromLocalStorage();
  items.push(user);
  localStorage.setItem("list", JSON.stringify(items));
}

function getFromLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function checkLocalStorage(username, email) {
  const user = { username, email };
  let items = getFromLocalStorage();
  items = items.find(function (item) {
    if (item.username === username) {
      return item;
    }
  });
  if (items) {
    return true;
  }
}
function checkEmailLocalStorage(email) {
  let items = getFromLocalStorage();
  items = items.find(function (item) {
    if (item.email === email) {
      return item;
    }
  });
  if (items) {
    alertStore(
      processAlert(
        "this email already existed sign in with your account",
        "red"
      )
    );
    return true;
  }
}

function validateLocalStorage(username, password) {
  if (checkLocalStorage(username, password)) {
    console.log(username, "is existed");
    items = items.find(function (item) {
      if (item.password === password) {
        return item;
      }
    });
    console.log(items);
    if (items) {
      return true;
    } else {
      alertStore(processAlert("your password is not correct ", "red"));
    }
  } else {
    alertStore(
      processAlert("this username doesn't exist , please sign up", "red")
    );
  }
}
// ****** SETUP ITEMS **********
function setupItems() {
  return (items = getFromLocalStorage());
}
