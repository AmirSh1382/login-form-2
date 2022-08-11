"use strict" 

import * as funcs from "./funcs.js"

let $ = document
// variables //////////////
const welcomeUser = $.querySelector(".welcome-user")

let locationSearch = location.search
let locationParams = new URLSearchParams(locationSearch)
let mainUserId = locationParams.get("id")


// fucntions /////////////////
// to display the main user name on dom
function getMainUser(){
    return new Promise((resolve , reject) => {
        let mainUser = null

        setTimeout(() => {
            mainUser = funcs.allUsers.find(user => {
                return user[0] === mainUserId
            })

            if(mainUser){
                resolve(mainUser)
            }
        }, 1000)
    })
}


// event listeners ///////////////
window.addEventListener("load" , funcs.getAllUsers)
window.addEventListener("load", funcs.liveUserScreenHeight)
window.addEventListener("resize", funcs.liveUserScreenHeight)
window.addEventListener("load" , () => {
    getMainUser()
               .then(user =>  welcomeUser.innerHTML = `Welcome ${user[1].name}`)
})