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

        function getRandomBreeds(breeds) {

            const randomBreeds = [];
            while(randomBreeds.length < 4) {
                const randomIndex = Math.floor(Math.random() * breeds.length);
                const randomBreed = breeds[randomIndex].name;
                if( !randomBreeds.includes(randomBreed) ) {
                    randomBreeds.push(randomBreed);
                }
            }
            return randomBreeds;
        
            
          }

        const url = "https://dog.ceo/api/breeds/image/random"
      
        try {
          const response = await fetch(url);
          const data = await response.json();
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const breed = data.message.split("/").slice(-2, -1)[0];
          const breedData = ALL_BREEDS.find(b => b.url.includes(breed));

          if(breedData) {

            const imageUrl = `https://dog.ceo/api/breed/${breedData.url}/images/random`;
            const imageResponse = await fetch(imageUrl);
            const imageData = await imageResponse.json();
            displayImage(imageData.message);
            
            const randomBreeds = getRandomBreeds(ALL_BREEDS);
            
           
            for ( let i = 0; i < 4; i++) {
                const button =  document.querySelectorAll(".quiz-answers")
    

                button.textContent === randomBreeds[i];
                if( button.textContent === breedData.name ) {
                    button.dataset.isCorrect = "true";
                } else {
                   button.dataset.isCorrect = "false";
                }

            }

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
      
}

