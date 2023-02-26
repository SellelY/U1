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

        const url = "https://dog.ceo/api/breeds/image/random"
      
        try {
          const response = await fetch(url);
          const data = await response.json();
          await new Promise(resolve => setTimeout(resolve, 2000))

          messageDiv.classList.add("hidden");
          
          const breed = data.message.split("/").slice(-2, -1)[0];
          const breedData = ALL_BREEDS.find(b => b.url.includes(breed));

          if( breedData ) {

            const imageUrl = `https://dog.ceo/api/breed/${breedData.url}/images/random`;
            const imageResponse = await fetch(imageUrl);
            const imageData = await imageResponse.json();
            displayImage(imageData.message);

          } else {
            displayImage(data.message);
          }
        } catch (error) {
          console.log("Error" + error);
        }
      }

      const answerButtons = document.querySelectorAll(".answer-button");
      answerButtons.forEach(button => {
        button.addEventListener("click", event => {
            const isCorrect = event.target.dataset.isCorrect === "true";
            if(isCorrect) {
                console.log("bravo!")
            } else {
                console.log("Incorrect!")
            }
        });
      });
      
      function displayImage(image) {
        const imgElement = document.querySelector("#dog-image");

        if(image) {
            imgElement.src = image;
        }
      }
      
      getRandomDogImage();

      function getRandomBreedName() {
        const randomIndex = Math.floor(Math.random() * ALL_BREEDS.length);
        return ALL_BREEDS[randomIndex].name;
      }

      const quizAnswers = document.querySelectorAll(".quiz-answers");
      quizAnswers.forEach( button => {
        button.textContent = getRandomBreedName();
      })
      
}

