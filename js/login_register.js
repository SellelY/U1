"use strict";

async function registerUser(event) {
  event.preventDefault(); // prevent the form from submitting

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