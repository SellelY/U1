"use strict";

function quizPage() {
    
    // const username = document.querySelector(".username").value;
    // document.querySelector(".display-username").textContent = `${username}`;
    const username = document.querySelector(".username").value;
    const displayUsername = document.querySelector(".display-username");
    const logoutButton = document.querySelector(".logout-button");
    const quizPage = document.querySelector("#quiz-page");

    if(!displayUsername.textContent) {
        displayUsername.textContent = `${username}`;
    }

    quizPage.style.display = "block";
    localStorage.setItem("isLoginRegisterHidden", "true");


    loginButton.addEventListener("click", () => {
        quizPage.style.display = "none";
        document.querySelector("#login_register").classList.remove("hidden");
        displayUsername.textContent ="";
    });
}

