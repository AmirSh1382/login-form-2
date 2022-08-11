"use strict";

import * as funcs from "./funcs.js";

let $ = document;
/////////////////////

// variabels ////////////////////////
const signUpAlert = $.querySelector(".sign-up-alert");
const signUpForm = $.querySelector(".sign-up-form");
const eyeIcon = $.querySelector(".eye-btn");
const usernameInput = $.querySelector(".username-input");
const usernameValidationAlert = $.querySelector(".username-validation-alert");
const passWordInput = $.querySelector(".password-input");
const passwordValidationAlert = $.querySelector(".password-validation-alert");


// fumctions ///////////////
// to validate form inputs
function formValidation(event) {
  event.preventDefault();

  let isUsernameAcceptable = usernameInputValidation();
  let isPassworAcceptable = passwordInputValidation();

  if (isUsernameAcceptable && isPassworAcceptable) {
    let newUser = {
      name: usernameInput.value,
      password: passWordInput.value,
    };

    signUp(newUser);
  }
}

// to validate the username input
function usernameInputValidation() {
  let usernameValue = usernameInput.value.trim();

  if (usernameValue.length < 8) {
    updateUsernameVaidationAlert("Username must be at least 8 characters", "red-alert");

    return false;
  } else if (isUsernameTaken(usernameValue)) {
    updateUsernameVaidationAlert("This username is already taken", "red-alert");

    return false;
  } else {
    updateUsernameVaidationAlert("Sounds great!", "green-alert");

    return true;
  }
}

// to show an alert if the entered username was taken before 
function isUsernameTaken(username) {
  let isUserExist = funcs.allUsers.find((user) => {
    if (user.name === username) return true;
  });

  if (isUserExist) return true;
}

// to update uesrname validation alert due to each change on the username input
function updateUsernameVaidationAlert(alertMsg, alertType) {
  usernameInput.addEventListener("input", usernameInputValidation);
  usernameValidationAlert.innerHTML = alertMsg;
  usernameValidationAlert.className = `password-validation-alert ${alertType}`;
}

// to validate the password input
function passwordInputValidation() {
  let passwordValue = passWordInput.value.trim();

  if (passwordValue.length < 8) {
    updatePasswordVaidationAlert("Password must be at least 8 characters", "red-alert");

    return false;
  } else if (!isTherAnUpperCaseChar(passwordValue)) {
    updatePasswordVaidationAlert("Password must contain an uppercase character", "red-alert");

    return false;
  } else {
    updatePasswordVaidationAlert("Sounds great!", "green-alert");

    return true;
  }
}

// to show an alert if the user didnt enter any uppercase characters
function isTherAnUpperCaseChar(word) {
  for (let char of word) {
    if (char == char.toUpperCase() && isNaN(char)) {
      return true;
    }
  }
}

// to update password validation alert due to each change on the password input
function updatePasswordVaidationAlert(alertMsg, alertType) {
  passWordInput.addEventListener("input", passwordInputValidation);
  passwordValidationAlert.innerHTML = alertMsg;
  passwordValidationAlert.className = `password-validation-alert ${alertType}`;
}

// if there were no problemes with the inputs validation, this func will be fired by clicking on (sign up) btn
function signUp(user) {
  fetch("https://login-form-1-73c9b-default-rtdb.firebaseio.com/users.json" , {
    method: "POST",
    headers: {
      "Content-type" : "application/json"
    },
    body: JSON.stringify(user)
  }).then(res => {
      resetForm();
      showSignUpAlert()
      
      setTimeout(() => {
        location.href = "./index.html"
      },5000)

      console.log(res)
    })
}

// to reset the form inputs and alerts
function resetForm() {
  usernameInput.value = "";
  passWordInput.value = "";
  
  usernameValidationAlert.innerHTML = "";
  passwordValidationAlert.innerHTML = "";
}  

// to show a sign up alert if the proccess was successfully done
function showSignUpAlert() {
  signUpAlert.classList.add("show");
}

// event listeners /////////////////////
window.addEventListener("load" , funcs.getAllUsers)
window.addEventListener("load", funcs.liveUserScreenHeight);
window.addEventListener("resize", funcs.liveUserScreenHeight);
eyeIcon.addEventListener("click", funcs.changeInputType);
signUpForm.addEventListener("submit", () => formValidation(event));