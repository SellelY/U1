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
    const message = document.querySelector(".message");
    const loginButton = document.querySelector("#login-register > button");

    // hide message
    message.classList.add("message-hidden");
    loginButton.disabled = true;

    //Show connecting...
    message.textContent = "Connecting...";
    message.classList.remove("message-hidden");

    if(status === 200) {

        message.textContent = "Login successful!";
        const button = document.createElement("button");
        button.textContent = "CLOSE";
        button.id = "message-button";
        message.appendChild(button);
        button.addEventListener("click", () => {
            message.classList.add("message-hidden");
            loginButton.disabled = false;

        });
    } else if(status === 401) {

        messageElement.textContent = "Invalid credentials";
        loginButton.disabled = false;

    } else if(status === 418) {

        messageElement.textContent = "I'm not a teapot!";
        loginButton.disabled = false;

    } else {

        messageElement.textContent = "An error occurred";
        loginButton.disabled = false;

    }
    messageElement.classList.remove("message-hidden");
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


  
  
  