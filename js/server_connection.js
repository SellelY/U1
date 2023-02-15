"use strict";

async function fetchData(username, password) {
    try {
      const randomNumber = Math.floor(Math.random() * 10);
      if (randomNumber === 0) {
        throw new Error("Malfunction occurred!");
      }
  
      const response = await fetch(`https://teaching.maumt.se/apis/access/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "register",
          username: username,
          password: password,
        }),
      });
  
      if (response.status === 418) {
        throw new Error("I'm not a teapot!");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
      if (error.message === "I'm not a teapot!") {
        alert("The server thinks it's not a teapot!");
      }
    }
  }
  