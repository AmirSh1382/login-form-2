"use strict"

let $ = document
//////////////////////////////////

// variables /////////////////////
const body = $.body;
const passWordInput = $.querySelector(".password-input");
const eyeIcon = $.querySelector(".eye-btn");

let allUsers = []


// functions //////////////////////
// to get user screen height and load and per each window resize
function liveUserScreenHeight() {
    let userScreenHeight = visualViewport.height + "px";
    body.style.minHeight = userScreenHeight;
}

// to get all usres from data base 
async function getAllUsers() {
  await fetch(`https://login-form-81e63-default-rtdb.firebaseio.com/users.json`)
     .then(res => res.json())
     .then(data => allUsers = Object.entries(data))
}

// to toggle input type between (password) and (text)
function changeInputType() {
  if (passWordInput.type === "password") {
    eyeIcon.className = "eye-btn bi bi-eye-slash";
    passWordInput.type = "text";
  } else {
    eyeIcon.className = "eye-btn bi bi-eye";
    passWordInput.type = "password";
  }
}

export {liveUserScreenHeight,changeInputType,getAllUsers,allUsers}