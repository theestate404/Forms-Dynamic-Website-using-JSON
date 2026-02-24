//Global varibles
let goal = null, container = null;
let sortDirection = 
{
    id: "ascending",
    number: "ascending",
    description: "ascending"
};
// Could not use window.onload on two separate .js files and found an alternative: https://stackoverflow.com/questions/67212323/two-js-files-with-window-onload-function-are-conflicting#:~:text=onload%20%2C%20as%20you%20have%20noticed,adds%20a%20listener%20when%20called.
window.addEventListener("load", () => {

    container = document.getElementById("databaseTable");
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
                
                window.addEventListener("resize", displayData);
            }).catch(err =>
            {
                console.error(err);
                container.innerHTML = "Failed to load data";
            });
            document.getElementById("tagManager").style.display = "none";
            document.getElementById("addManager").style.display = "none";
    // Had an issue where i couldnt get error handling to work but learned fetch() returns a promise and how to use .catch in : https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises#error_handling
});
/*-----------Sort targets by description or number and re-build table-----------*/
function handleSort(column)
{
    if (sortDirection[column] === "ascending")
    {
        sortDirection[column] = "descending";
    }
    else
    {
        sortDirection[column] = "ascending";
    }
    
    if(sortDirection[column] === "ascending")
    {
        goal.targets.sort((a, b) => a[column] < b[column]? -1: 1);
    }
    else
    {
        goal.targets.sort((a, b) => a[column] < b[column]? 1: -1);

    }
    displayData();
}
/*-------------------Render goal info and table rows-------------------*/
function displayData() {
    let htmlString = "";
    
    const isMobile = window.matchMedia("(max-width: 786px)").matches;
    //https://stackoverflow.com/questions/53382733/how-to-get-window-width-in-javascript-to-match-the-css-media
    //https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
    const targets = goal.targets;
    if(isMobile)
    {
        

                //TOP SECTION
                htmlString = `
                    <h1>Goal ${goal.number}</h1>
                    <h2>${goal.title}</h2>
                    <p>${goal.description}</p>`;
        
                targets.forEach((target, index) => {
                    htmlString += `
                    <div class = "card" onClick = "openInfoModal(goal.targets[${index}])">
                        <h3>ID: ${target.id}
                        <h3>Target ${target.number}</h3>
                        <p>${target.description}</p>
                    </div>`;
                    
                });
                // Link section
                htmlString += `
                <hr>
                <h3>Links</h3>
                <a href = "${goal.links.official}">${goal.links.official}</a>
                <br>
                <a href = "${goal.links.undp}">${goal.links.undp}</a>
                `;
                container.innerHTML = htmlString;
    }
    //Data table display (What's seen on the webpage)
    else
    {
        htmlString = `
            <h1>Goal ${goal.number}</h1>
            <h2>${goal.title}</h2>
            <p>${goal.description}</p>
            <br>
        <table id = "dataTable">
            <tr>
                <th onclick = handleSort("id")>ID ${sortDirection[`id`] === "ascending" ? "&#8593" : "&#8595"}</th>
                <th onclick = handleSort("number")>Target ${sortDirection[`number`] === "ascending" ? "&#8593" : "&#8595"}</th>
                <th onclick = handleSort("description")>Description ${sortDirection[`description`] === "ascending" ? "&#8593" : "&#8595"}</th>
                <th id = "sortFavourite">Favourite</th>
                <th>Actions</th>
        </tr>
            `;
        // Adds the table rows for each target
        goal.targets.forEach((target, index) =>
        {
            const targetIsFavourite = target.examples.some(example => example.isFavourite); //Some: at least one item is true
           //R Filled heart : empty heart
            let heart;
            if (targetIsFavourite){
                heart = "&#10084;";
            }else{
                heart = "&#9825;";
            }
            htmlString += `
            <tr class = "target_row">
                    <td onclick = "openInfoModal(goal.targets[${index}])">${target.id}</td>
                    <td onclick = "openInfoModal(goal.targets[${index}])">${target.number}</td>
                    <td onclick = "openInfoModal(goal.targets[${index}])">${target.description}</td>
                    <td class = "fav_cell">${heart}</td>
                    <td class = "actions_cell">  
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
    }
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

    let info = `<h2>Target ${target.number}</h2>`;

    target.examples.forEach(example => {
        const favourite = example.isFavourite ? "<span>&#10084</span> Favourited" : "<span>&#9825</span>";

        info += `
            <h4>${example.title}<span>  ${favourite}</span></h4>
            <p>${example.description}</p>
        `;
        //rating display
        info +=`
        <p class = "rating_stars_display">${builtStarRating(example.rating_random)}</p>
        `;
        example.images.forEach(img => {
            info += `<img src="${img}" width="200">`;
        });

        info += `<p>Tags: ${example.tags.join(", ")}</p>`;
    });
    //learned about .join for arrays from: https://www.w3schools.com/jsref/jsref_join.asp
    content.innerHTML = info;

    document.getElementById("closeInfoModal").onclick = closeInfoModal;
}
