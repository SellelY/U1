"use strict";

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login");
    const registerForm = document.getElementById("register");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        registerForm.classList.remove("form--hidden");
        document.querySelector(".form__input-group").value = "";

  
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault
        loginForm.classList.remove("form--hidden");
        registerForm.classList.add("form--hidden");
        document.querySelector(".form__input-group").value = "";
    });

    // loginForm.addEventListener("submit", e => {
    //     e.preventDefault();

    //     //fetch

    //     setFormMessage(loginForm, "error", "Wrong username or password.")
    // })
});

const form = document.getElementById("register");
form.addEventListener("submit", event => {
event.preventDefault(); // prevent the form from submitting via HTTP POST
const user_name = document.querySelector(".usernameInput").value;
const password_ = document.querySelector(".passwordInput").value;
fetchData(user_name, password_);
});




