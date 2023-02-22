"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const loggedIn = localStorage.getItem("loggedIn");
    if(loggedIn === "true") {
        quizPage();
    }
});

function quizPage() {

    const quizDiv = document.querySelector("#quiz-page");
    quizDiv.classList.remove("hidden");

    const logoutButton = document.createElement = ("button");
    logoutButton.className = "button";
    logoutButton.textContent = "Logout";
    logoutButton.addEventListener("click", () => {
        logout();
    });

    const div = document.querySelector("#quizPage");
    div.appendChild(logoutButton);
}
