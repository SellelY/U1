"use strict";

async function sendRequest(POSTorGET) {
    const response = await fetch(POSTorGET);
    console.log(response);

    let tempResource;

    if(!response.ok) {
        connectFeedback(response.status);
    } else {
        const resource = await response.json();
        tempResource = resource;
        console.log(resource);
    }

    return tempResource;
}

//message div
function connectFeedback(status) {
    const _status = document.querySelector(".status");
    const loginButton = document.querySelector("#login button");
    const messageDiv = document.querySelector("#message");
    const closeButton = document.querySelector(".close");
    const wrongPasswordOrUsername = document.querySelector(".wrong-user-pass");
 
    loginButton.disabled = true;

    if(status === 200) {
        messageDiv.classList.remove("hidden");

        _status.textContent = "Registration is successful!";
        loginButton.disabled = false;

    } else if(status === 409) {
        messageDiv.classList.remove("hidden");
        _status.textContent = "Sorry, the name is already taken";
        loginButton.disabled = false;

    } else if(status === 418) {
        messageDiv.classList.remove("hidden");
        _status.textContent = "The server thinks it's not a teapot!";
        loginButton.disabled = false;

    } else {
        messageDiv.classList.add("hidden");
        wrongPasswordOrUsername.classList.remove("hidden");
        loginButton.disabled = false;

    }
    

    // show button
    closeButton.style.display = "block";

    closeButton.addEventListener("click", () => {
        messageDiv.classList.add("hidden");
        loginButton.disabled = false;

    });
}

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login");
    const registerForm = document.getElementById("register");

    let prevBackgroundImage = document.body.style.backgroundImage; //store the previous back-image

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        registerForm.classList.remove("form--hidden");

        prevBackgroundImage = document.body.style.backgroundImage; // store the current back-image
        document.body.style.backgroundImage = "url('../media/worldWater.jpeg')"; // add new back-image
  
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault
        loginForm.classList.remove("form--hidden");
        registerForm.classList.add("form--hidden");

        document.body.style.backgroundImage = prevBackgroundImage; // restore previous back-image        
        
    });

});


  
  
  