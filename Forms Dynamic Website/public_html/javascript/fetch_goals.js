//Global varibles
let sortTargetBy = "ascending", sortDescriptionBy = "ascending", goal = null, container = null;

// Could not us window.onload on two separate .js files and found an alternative: https://stackoverflow.com/questions/67212323/two-js-files-with-window-onload-function-are-conflicting#:~:text=onload%20%2C%20as%20you%20have%20noticed,adds%20a%20listener%20when%20called.
window.addEventListener("load", () => {

    container = document.getElementById("target");
    let url = "un_sustainability_goal_12.json";
    fetch(url)
            .then(response => response.json())
            .then(jsonData =>
            {
                goal = jsonData.goal;

                /**/
                goal.targets.forEach(target => {
                    target.examples.forEach(example => {
                        example.isFavourite = Math.random() < 0.33;

                        //R: Rating system
                        //Math.random gives 0 to 0.99 and floor takes the decimals away giving 0 to 5 https://www.codecademy.com/forum_questions/5020be4d3a51800002015ebe
                        example.rating_random = Math.floor(Math.random() * 6);
                    });
                });
                //✅ R: test one example rating in the console
                console.log(goal.targets[0].examples[0].rating_random);

                displayData();
            }).catch(err =>
            {
                console.error(err);
                container.innerHTML = "Failed to load data";
            });
    // Had an issue where i couldnt get error handling to work but learned fetch() returns a promise and how to use .catch in : https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises#error_handling
});
/*-----------Switch target sort order-----------*/
function switchSortTargets()
{
    sortTargetBy = sortTargetBy === "ascending" ? "descending" : "ascending";
    // Found out about ternary operatorhttps://stackoverflow.com/questions/8860654/javascript-single-line-if-statement-best-syntax-this-alternative
    // Found out more about it here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
    sortTargets();
}
/*-----------Switch description sort order-----------*/
function switchSortDescriptions()
{
    sortDescriptionBy = sortDescriptionBy === "ascending" ? "descending" : "ascending";
    sortDescriptions();
}
/*-----------Sort targets by description and re-build table-----------*/
function sortDescriptions()
{
    if (sortDescriptionBy === "ascending")
    {
        goal.targets.sort((a, b) => a.description < b.description ? -1 : a.description > b.description ? 1 : 0);
    } else
    {
        goal.targets.sort((a, b) => a.description < b.description ? 1 : a.description > b.description ? -1 : 0);
    }
    displayData();
}
/*-----------Sort targets and re-build table-----------*/
function sortTargets()
{
    if (sortTargetBy === "ascending")
    {
        goal.targets.sort((a, b) => a.id < b.id ? -1 : 1);

    } else
    {
        goal.targets.sort((a, b) => a.id < b.id ? 1 : -1);

    }
    //learned about being able to add something after a and b from https://www.w3schools.com/js/js_array_sort.asp where they sort by .year
    displayData();
}
/*-------------------Render goal info, table rows, and attach event handlers-------------------*/
function displayData() {

//Data table display (What's seen on the webpage)
    let htmlString = `
        
        <h1>Goal ${goal.number}</h1>
        <h2>${goal.title}</h2>
        <p>${goal.description}</p>
        <br>
    <table id = "dataTable">
        <tr>
            <th id = "sortTarget">Target ${sortTargetBy === "ascending" ? "&#8593" : "&#8595"}</th>
            <th id = "sortDescription">Description ${sortDescriptionBy === "ascending" ? "&#8593" : "&#8595"}</th>
            
            <th id = "sortFavourite">Favourite</th>
            <th>Actions</th>
    </tr>
        `;
    // Adds the table rows for each target
    goal.targets.forEach((target) =>
    {
        const targetIsFavourite = target.examples.some(example => example.isFavourite) //Some: at least one item is true
       //R Filled heart : empty heart
        let heart;
        if (targetIsFavourite){
            heart = "&#10084;";
        }else{
            heart = "&#9825;";
        }
        htmlString += `
        <tr class = "target_row">
                <td>${target.number}</td>
                <td>${target.description}</td>
                <td class = "fav_cell">${heart}</td>
                <td class = "actions_cell">
                <button class = "edit_btn">Edit</button>    
                <button class = "delete_btn">Delete</button> 
                </td>
        </tr>
            `;

    });
    htmlString += `</table>`;

    // Link section
    htmlString += `
        <hr>
        <h3>Links</h3>
        <a href = "${goal.links.official}">${goal.links.official}</a>
        <br>
        <a href = "${goal.links.undp}">${goal.links.undp}</a>
        `;
    container.innerHTML = htmlString;

    document.getElementById("sortTarget").onclick = switchSortTargets;
    document.getElementById("sortDescription").onclick = switchSortDescriptions;

    // Click event for target row to open modal
    document.querySelectorAll(".target_row").forEach((row, index) => {
        row.onclick = () => openInfoModal(goal.targets[index]);
        
        //Learned about querySelectorAll https://www.w3schools.com/jsref/met_document_queryselectorall.asp
        //Learned about the positioning in the brackets in forEach https://www.w3schools.com/jsref/jsref_foreach.asp
        
        document.querySelectorAll(".actions_cell").forEach(cell => {
            cell.addEventListener("click", (event) => {
                event.stopPropagation(); // Prevents row click event
        // Found out about preventing an event from happening https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation#:~:text=The%20stopPropagation()%20method%20of,on%20links%20are%20still%20processed.   
                });
            });
        document.querySelectorAll(".fav_cell").forEach(cell => {
            cell.addEventListener("click", (event) => {
                event.stopPropagation();
            });
        });
    }); 
}
/*---------------0–5 star rating string---------------*/
function builtStarRating(ratingNumber){
    let stars = "";
    for(let i = 0; i< ratingNumber; i++){
        stars += "★";
    }
    //add empty stars after knowing how many full ones we already have
    for(let i = ratingNumber;i<5;i++){
        stars += "☆";
    }
    return stars;
}
/*---------------Fill and show modal with selected target details---------------*/
function displayInfoModal(target)
{
    const content = document.getElementById("infoModalContent");

    let html = `<h2>Target ${target.number}</h2>`;

    target.examples.forEach(example => {
        const favourite = example.isFavourite ? "<span>&#10084</span> Favourited" : "<span>&#9825</span>";

        html += `
            <h4>${example.title}<span>  ${favourite}</span></h4>
            <p>${example.description}</p>
        `;
        //rating display
        html +=`
        <p class = "rating_stars_display">${builtStarRating(example.rating_random)}</p>
        `;
        example.images.forEach(img => {
            html += `<img src="${img}" width="200">`;
        });

        html += `<p>Tags: ${example.tags.join(", ")}</p>`;
    });
    //learned about .join for arrays from: https://www.w3schools.com/jsref/jsref_join.asp
    content.innerHTML = html;

    document.getElementById("closeInfoModal").onclick = closeInfoModal;
}
