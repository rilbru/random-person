'use strict'

// function to create a new element for each random person
// and append to the DOM as a child
function addData(firstName, lastName, phoneNum, email) {
    const displayInfo = document.getElementById("display-info");
    const personNode = document.createElement("p");
    personNode.textContent = `Name: ${firstName} ${lastName}, Number: ${phoneNum}, Email: ${email}`;
    displayInfo.appendChild(personNode);
} 

// event handlers for clicking on direct link and express link
// extracts the name, phone number, and email
// addData is called to pass the extracted info
document.addEventListener('DOMContentLoaded', function() {
    const directLink = document.getElementById("direct-link");
    const expressLink = document.getElementById("express-link");

    directLink.addEventListener("click", async function(event) {
        event.preventDefault();
        try {
            const response = await fetch("https://randomuser.me/api/");    // HTTP GET request
            const data = await response.json();  
            const person = data.results[0];
            const firstName = person.name.first;
            const lastName = person.name.last;
            const phoneNum = person.phone;
            const email = person.email;

            addData(firstName, lastName, phoneNum, email);
        } catch (error) {
            console.log(error);
        }
    });

    expressLink.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const response = await fetch ("http://localhost:3000/random-person");
            const data = await response.json();
            const person = data.results[0];
            const firstName = person.name.first;
            const lastName = person.name.last;
            const phoneNum = person.phone;
            const email = person.email;

            addData(firstName, lastName, phoneNum, email);
        } catch (error) {
            console.log(error);
        }
    });
});