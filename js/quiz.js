"use strict";

function quizPage() {
    main.innerHTML = `
      <div id="message" class="hidden">
        <div class="message-container">
            <div id="message-holder">
                <p class="status"></p>
                <button class="close close--hidden">CLOSE</button>
            </div>
        </div>
      </div>  
    
      <div id="quiz-page">

        <div class="header-div">
            <div>
                <p class="display-username"></p>
                <button class="logout-button">Logout</button>
            </div>
        </div>

        <div class="dog-pictures">
            <img src="./media/logo.png" id="dog-image" alt="">
        </div>

        <div class="button-container">
            <button class="quiz-answers"></button>
            <button class="quiz-answers"></button>
            <button class="quiz-answers"></button>
            <button class="quiz-answers"></button>
        </div>

      </div>

    `;

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
        const messageContainer = document.querySelector(".message-container");
        const messageHolder = document.querySelector("#message-holder");
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

      
        let randomButtonIndex = Math.floor(Math.random() * buttons.length);

        buttons.forEach((button, index) => {
          if (index === randomButtonIndex) {
            button.textContent = breedName;
          } else {
            button.textContent = getRandomBreedName();
          }

          if (button.textContent === breedName) {
            button.classList.add("correct");
          } else {
            button.classList.remove("correct");
          }

          button.addEventListener("click", () => {
            if (button.classList.contains("correct")) {
              messageContainer.style.height = "140%"
              messageHolder.style.backgroundColor = "lightgreen";
              messageDiv.classList.remove("hidden");
              _status.textContent = "CORRECT!";
              closeButton.style.display = "block";
              closeButton.textContent = "Next breed";
            } else {
              messageContainer.style.height = "140%"
              messageHolder.style.backgroundColor = "red";
              messageDiv.classList.remove("hidden");
              _status.textContent = "Incorrect :(";
              closeButton.style.display = "block";
              closeButton.textContent = "Try again!"
            }
          });
        });

        closeButton.addEventListener("click", () => {
          messageDiv.classList.add("hidden");
          closeButton.style.display = "none";
          if (_status.textContent === "CORRECT!") {
            getRandomDogImage();
          }
        });

        function getRandomBreedName() {
          const randomIndex = Math.floor(Math.random() * ALL_BREEDS.length);
          return ALL_BREEDS[randomIndex].name;
        }
      }
        
      
      getRandomDogImage();
      
}


