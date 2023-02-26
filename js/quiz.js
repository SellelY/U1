"use strict";

function quizPage() {

    const username = document.querySelector(".username").value;
    const displayUsername = document.querySelector(".display-username");
    const logoutButton = document.querySelector(".logout-button");
    const quizPage = document.querySelector("#quiz-page");
    const loginRegister = document.querySelector("#login_register");

    // Retrieve the username from localStorage, if available
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
        displayUsername.textContent = storedUsername;
    } else {
        displayUsername.textContent = username;
        localStorage.setItem("username", username);
    }

    quizPage.style.display = "block";

    logoutButton.addEventListener("click", () => {
        quizPage.style.display = "none";
        loginRegister.classList.remove("hidden");
        localStorage.setItem("quizState", "hidden");
        localStorage.removeItem("username");
    })

    async function getRandomDogImage() {
        const url = "https://dog.ceo/api/breeds/image/random";
      
        try {
          const response = await fetch(url);
          const data = await response.json();
          await new Promise(resolve => setTimeout(resolve, 1000))
          displayImage(data.message);
        } catch (error) {
          console.log("Error" + error);
        }
      }
      
      function displayImage(image) {
        const imgElement = document.querySelector("#dog-image");

        if(!image) {
            imgElement.src = "./media/logo.png";
        } else {
            imgElement.src = image;
        }
      }
      
      getRandomDogImage();
      
}

