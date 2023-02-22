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
  }

}

const loginForm = document.querySelector("#login");
loginForm.addEventListener("submit", loginUser);

window.onload = function() {
  const registerForm = document.querySelector("#register");
  const loginForm = document.querySelector("#login");
  const usernameInput = document.querySelectorAll(".username");
  const passwordInput = document.querySelectorAll(".password");
  const usernameRInput = document.querySelector(".usernameR");
  const passwordRInput = document.querySelector(".passwordR");

  if (registerForm !== null) {
    usernameRInput.value = "";
    passwordRInput.value = "";
  }

  if (loginForm !== null) {
    usernameInput.forEach(input => input.value = "");
    passwordInput.forEach(input => input.value = "");
  }
};