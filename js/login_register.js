"use strict";

async function registerUser(event) {
  event.preventDefault(); // prevent the form from submitting

  main.innerHTML = `
    <div id="message" class="hidden">
      <div class="message-container">
          <div id="message-holder">
              <p class="status"></p>
              <button class="close close--hidden">CLOSE</button>
          </div>
      </div>
    </div>  
  
    <div id="login_register">
      
      <div class="container">
          <form class="form" id="login">
              <div class="login__container">
                  <h1 class="form__title">LOGIN</h1>

              <div class="form__input-group">
                  <label for="username">Username:</label>
                  <input type="text" name="username" class="username" autofocus>
              </div>

              <div class="form__input-group">
                  <label for="password">Password:</label>
                  <input type="password" class="password" autofocus>
              </div>
              
              <div class="form__message form__message-error"></div>
              <p class="wrong-user-pass hidden">Wrong username or password</p>
              <p class="form__text">Let the magic start!</p>
              <button class="button" type="submit">Login</button>
              <p class="form__register">
                  <a id="linkCreateAccount">New to this? Register for free</a>
              </p>

              
              </div>
          </form>

      <div class="container">
          <form class="form form--hidden" id="register" action="" method="POST">
              <div class="login__container">
                  <h1 class="form__title">REGISTER</h1>

              <div class="form__input-group">
                  <label for="username">Username:</label>
                  <input type="text" class="usernameR" autofocus>
              </div>

              <div class="form__input-group">
                  <label for="password">Password:</label>
                  <input type="password" class="passwordR" autofocus>
              </div>

              <p class="form__text">Ready when you are...</p>
              <button class="button" type="submit">Register</button>
              <p class="form__register">
                  <a id="linkLogin">Already have an account? Go to login</a>
              </p>

              </div>
          </form>
      
      </div>
  </div>

  `;

  const formElement = event.target;
  const usernameValue = formElement.querySelector(".usernameR").value;
  const passwordValue = formElement.querySelector(".passwordR").value;

  const POSTrqst = new Request(URL, {
    method: "POST",
    headers: {"Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify({
      action: "register",
      user_name: usernameValue,
      password: passwordValue
    }),
  });

  const resource = await sendRequest(POSTrqst);
  if (resource === undefined) {
    console.log(resource);
    } else {
      connectFeedback(200);
    }

}

const registerForm = document.querySelector("#register");
registerForm.addEventListener("submit", registerUser);


async function loginUser(event) {
  event.preventDefault();

  const messageDiv = document.querySelector("#message");
  const _status = document.querySelector(".status");
  const wrongPassOrUser = document.querySelector(".wrong-user-pass");

  wrongPassOrUser.classList.add("hidden");
  messageDiv.classList.remove("hidden");
  _status.textContent = "Connecting...";

  // hide button
  const closeButton = document.querySelector(".close");
  closeButton.style.display = "none";


  const username = document.querySelector(".username").value;
  const password = document.querySelector(".password").value;

  const GETrequest = new Request(URL + `?action=check_credentials&user_name=${username}&password=${password}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },

  });

  const resource = await sendRequest(GETrequest);
  if(resource === undefined) {
    console.log(resource);
  } else {
    document.querySelector("#login_register").classList.add("hidden");
    messageDiv.classList.add("hidden");
    quizPage();
    localStorage.setItem("quizState", "visible");
    
  }

}

const loginForm = document.querySelector("#login");
loginForm.addEventListener("submit", loginUser);

window.onload = function() {
  const registerForm = document.querySelector("#register");
  const loginForm = document.querySelector("#login");
  const usernameInput = document.querySelector(".username");
  const passwordInput = document.querySelector(".password");
  const usernameRInput = document.querySelector(".usernameR");
  const passwordRInput = document.querySelector(".passwordR");
  const loginRegister = document.querySelector("#login_register");

  usernameRInput.value = "";
  passwordRInput.value = "";
  usernameInput.value = "";
  passwordInput.value = "";

  const quizState = localStorage.getItem("quizState");
  if( quizState === "visible" ) {
    loginRegister.classList.add("hidden");
    quizPage();
  } else {
    loginRegister.classList.remove("hidden");
    localStorage.setItem("quizState", "hidden");
  }

};