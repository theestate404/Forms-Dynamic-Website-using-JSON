/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
document.addEventListener("DOMContentLoaded", () => {
    let container = document.getElementById("cardsContainer")

    fetch("un_sustainability_goal_12.json")
            .then(response => response.json())
            .then(data => {
                const goal = data.goal;
                const targets = goal.targets;

                //TOP SECTION
                container.innerHTML = `
                    <h1>Goal ${goal.number}</h1>
                    <h2>${goal.title}</h2>
                    <p>${goal.description}</p>`
        
                targets.forEach(target => {
                    let card = document.createElement("div")
                    card.className = "card"

                    card.innerHTML = `
                        <h3>Target ${target.number}</h3>
                        <p>${target.description}</p>`

                    container.appendChild(card);
                })
            })
})






