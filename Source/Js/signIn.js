"use strict"

import * as funcs from "./funcs.js"

let $ = document
////////////////////////////////////////////////

// variabels ///////////////////////////////////
const successfullySignInAlert = $.querySelector(".successfully-sign-in-alert")
const unsuccessfulSignInAlert = $.querySelector(".unsuccessful-sign-in-alert")
const signInForm = $.querySelector(".sign-in-form")
const usernameInput = $.querySelector(".username-input")
const passWordInput = $.querySelector(".password-input")
const eyeIcon = $.querySelector(".eye-btn")

//functions /////////////////////////////////////
// to sign the user in based on inputs value
function signInUser(event){
    event.preventDefault()

    let usernameValue = usernameInput.value
    let passWordValue = passWordInput.value

    let mainUser = funcs.allUsers.find(user => {
        return (user[1].name == usernameValue && user[1].password == passWordValue)
    })

    if(mainUser){
        successfullySignInAlert.classList.add("show")

        setTimeout(() => {
            location.href = `./welcome.html?id=${mainUser[0]}`
        },4000)
    }else{
        unsuccessfulSignInAlert.classList.remove("hide")
        unsuccessfulSignInAlert.classList.add("show")

        setTimeout(() =>{
            unsuccessfulSignInAlert.classList.add("hide")
            unsuccessfulSignInAlert.classList.remove("show")
        },5000)
    }

    resetForm()
}

// to reset the form inputs
function resetForm(){
    usernameInput.value = ""
    passWordInput.value = ""
}

// event listeners ///////////
window.addEventListener("load" , funcs.getAllUsers)
window.addEventListener("load", funcs.liveUserScreenHeight)
window.addEventListener("resize", funcs.liveUserScreenHeight)
eyeIcon.addEventListener("click", funcs.changeInputType)
signInForm.addEventListener("submit", () => signInUser(event))