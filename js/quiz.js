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
        const messageDiv = document.querySelector("#message");
        const _status = document.querySelector(".status");
        const closeButton = document.querySelector(".close");
        closeButton.style.display = "none";
      
        messageDiv.classList.remove("hidden");
        _status.textContent = "Loading new dog-image...";
        
        async function fetchRandomImage() {
          const randomBreed = ALL_BREEDS[Math.floor(Math.random() * ALL_BREEDS.length)];
          const url = `https://dog.ceo/api/breed/${randomBreed.url}/images/random`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
          }
          messageDiv.classList.add("hidden");
          const data = await response.json();
          return {
            imageUrl: data.message,
            breedName: randomBreed.name
          };
        }
      
        const { imageUrl, breedName } = await fetchRandomImage();
        const imgElement = document.getElementById("dog-image");
        imgElement.setAttribute("src", imageUrl);
      
        const buttonContainer = document.querySelector(".button-container");
        const buttons = buttonContainer.querySelectorAll(".quiz-answers");
      
        buttons.forEach(button => {
          button.textContent = getRandomBreedName();
          if (button.textContent === breedName) {
            button.setAttribute("data-breed-name", breedName);
          }
        });
      
        function getRandomBreedName() {
          const randomIndex = Math.floor(Math.random() * ALL_BREEDS.length);
          return ALL_BREEDS[randomIndex].name;
        }

        buttons.forEach((button, index) => {
            button.textContent = ALL_BREEDS[index].name;
            if (ALL_BREEDS[index].name === breedName) {
              button.classList.add("correct");
            }
        
            button.addEventListener("click", () => {
              if (button.classList.contains("correct")) {
                console.log("CORRECT!");
              } else {
                console.log("incorrect");
              }
            });
          });
        }
        
      
      getRandomDogImage();
      
}


