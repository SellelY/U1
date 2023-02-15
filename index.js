/*
Relevanta namn på variabler (något som informerar om vad variabeln innehåller)

5. Funktionen fetch får bara förekomma på ett ställe på i hela kodbasen. Du måste alltså skapa en egen funktion som anropas när du vill
skicka en request. Det är i den funktionen som fetch-används.

6. Notera att alla raser finns i data.js. Du behöver dem för att skapa varje fråga.
*/ 

// async function fetchData() {
    
//     try {

//         const randomNumber = Math.floor(Math.random() * 10);
//         if(randomNumber === 0) {
//             throw new Error("Malfunction occurred!");
//         }

//         const response = await fetch ("https://teaching.maumt.se/apis/access/ ");
//         if(response.status === 418) {
//             throw new Error("I'm not a teapot!");
//         }
//         const data = await response.json();
//         console.log(data);

//     } catch(error) {
//         console.error(error);
//         if(error.message === "I'm not a teapot!") {
//             alert("The server thinks it's not a teapot!")
//         }
//     }

// }



