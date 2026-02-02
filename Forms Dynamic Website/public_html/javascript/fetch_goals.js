//Global varibles
let sortTargetBy = "ascending", sortDescriptionBy = "ascending", goal = null, constainer = null


// could not us window.onload on two separate .js files and found an alternative: https://stackoverflow.com/questions/67212323/two-js-files-with-window-onload-function-are-conflicting#:~:text=onload%20%2C%20as%20you%20have%20noticed,adds%20a%20listener%20when%20called.
window.addEventListener("load", () => {

    container = document.getElementById("target")
    let url = "un_sustainability_goal_12.json"
    fetch(url)
            .then(response => response.json())
            .then(jsonData =>
            {
                goal = jsonData.goal


                goal.targets.forEach(target => {
                    target.examples.forEach(example => {
                        example.isFavourite = Math.random() < 0.33
                    })
                })
                displayData()
            }).catch(err =>
    {
        console.error(err)
        container.innerHTML = "Failed to load data"
    })
    //had an issue where i couldnt get error handling to work but learned fetch() returns a promise and how to use .catch in : https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises#error_handling
})
function switchSortTargets()
{
    sortTargetBy = sortTargetBy === "ascending" ? "descending" : "ascending"
    // found out about ternary operatorhttps://stackoverflow.com/questions/8860654/javascript-single-line-if-statement-best-syntax-this-alternative
    // found out more about it here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
    sortTargets()
}
function switchSortDescriptions()
{
    sortDescriptionBy = sortDescriptionBy === "ascending" ? "descending" : "ascending"
    sortDescriptions()
}
function sortDescriptions()
{
    if(sortDescriptionBy === "ascending")
    {
        goal.targets.sort((a, b) => a.description < b.description ? -1 : a.description > b.description ? 1 : 0)
    }
    else
    {
        goal.targets.sort((a, b) => a.description < b.description ? 1 : a.description > b.description ? -1 : 0)
    }
    displayData()
}
function sortTargets()
{
    if (sortTargetBy === "ascending")
    {
        document.getElementById("sortTarget").innerHTML = "Target &#8593"
        goal.targets.sort((a, b) => a.id < b.id ? -1 : 1)
        
    } 
    else
    {
        document.getElementById("sortTarget").innerHTML = "Target &#8595"
        goal.targets.sort((a, b) => a.id < b.id ? 1 : -1)
        
    }
    //learned about being able to add something after a and b from https://www.w3schools.com/js/js_array_sort.asp where they sort by .year
    displayData()
}
function displayData() {
    //displays the data

    let htmlString = `
        
        <h1>Goal ${goal.number}</h1>
        <h2>${goal.title}</h2>
        <p>${goal.description}</p>
        <br>
    <table border = "5" width = "100%" align = "center" id = "dataTable">
        <tr>
            <th id = "sortTarget">Target ${sortTargetBy === "ascending" ? "&#8593" : "&#8595"}</th>
            <th id = "sortDescription">Description ${sortDescriptionBy === "ascending" ? "&#8593" : "&#8595"}</th>
        </tr>
        `
    // Adds the table rows for each target
    goal.targets.forEach((target) =>
    {
        htmlString += `
        <tr class = "target_row">
                <td>${target.number}</td>
                <td>${target.description}</td>
            `

    })
    htmlString += `</table>`
    
    // Link section
    htmlString += `
        <hr>
        <h3>Links</h3>
        <a href = "${goal.links.official}">${goal.links.official}</a>
        <br>
        <a href = "${goal.links.undp}">${goal.links.undp}</a>
        `
    container.innerHTML = htmlString

    document.getElementById("sortTarget").onclick = switchSortTargets
    document.getElementById("sortDescription").onclick = switchSortDescriptions
    
    // click event for target row to open modal
    document.querySelectorAll(".target_row").forEach((row, index) => {
        row.onclick = () => openInfoModal(goal.targets[index])
        //Learned about querySelectorAll https://www.w3schools.com/jsref/met_document_queryselectorall.asp
        //Learned about the positioning in the brackets in forEach https://www.w3schools.com/jsref/jsref_foreach.asp
    })
}
function displayInfoModal(target)
{
    const content = document.getElementById("infoModalContent")

    let html = `<h2>Target ${target.number}</h2>`
    
    target.examples.forEach(example => {
        const favourite = example.isFavourite ? "<span>&#9733</span> Favourited" : "<span>&#9734</span>"
        
        html += `
            <h4>${example.title}<span>  ${favourite}</span></h4>
            <p>${example.description}</p>
        `

        example.images.forEach(img => {
            html += `<img src="${img}" width="200">`
        })

        html += `<p>Tags: ${example.tags.join(", ")}</p>`
    })
//learned about .join for arrays from: https://www.w3schools.com/jsref/jsref_join.asp
    content.innerHTML = html
    
    document.getElementById("closeInfoModal").onclick = closeInfoModal;
}
