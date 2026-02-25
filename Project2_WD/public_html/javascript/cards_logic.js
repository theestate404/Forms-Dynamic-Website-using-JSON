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
                let htmlString = `
                    <h1>Goal ${goal.number}</h1>
                    <h2>${goal.title}</h2>
                    <p>${goal.description}</p>`
        
                targets.forEach((target, index) => {
                    htmlString += `
                    <div class = "card" onClick = "openInfoModal(goal.targets[${index}])">
                        <h3 >Target ${target.number}</h3>
                        <p>${target.description}</p>
                    </div>`
                    
                })
                // Link section
                htmlString += `
                <hr>
                <h3>Links</h3>
                <a href = "${goal.links.official}">${goal.links.official}</a>
                <br>
                <a href = "${goal.links.undp}">${goal.links.undp}</a>
                `;
                container.innerHTML = htmlString;
            })
})






