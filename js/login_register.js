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

  try {
    const response = await fetch(POSTrqst);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      connectFeedback(response.status);
    } else {
      connectFeedback(response.status);
    }
  } catch (error) {
    console.error(error);
  }
}

const registerForm = document.querySelector("#register");
registerForm.addEventListener("submit", registerUser);


async function loginUser(event) {
  event.preventDefault();

  const username = document.querySelector(".username").value;
  const password = document.querySelector(".password").value;

  const GETrequest = new Request(`${URL}prefix?action=check_credentials&user_name=${username}&password=${password}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },

  });

  try {
    const response = await fetch(GETrequest);

    if(response.ok) {
      const data = await response.json(); // process the response data
      connectFeedback(200);
    } else if(response.status === 401) {
      connectFeedback(401);
    } else if(response.status === 418) {
      connectFeedback(418);
    } else {
      connectFeedback(response.status);
    }

  } catch(error) {
    console.error(error);
  }

}

const loginForm = document.querySelector("#login");
loginForm.addEventListener("submit", loginUser);