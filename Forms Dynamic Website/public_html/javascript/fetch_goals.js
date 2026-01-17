let sortBy = "ascending";
let goal = null;
let container = null;
// could not us window.onload on two separate .js files and found an alternative: https://stackoverflow.com/questions/67212323/two-js-files-with-window-onload-function-are-conflicting#:~:text=onload%20%2C%20as%20you%20have%20noticed,adds%20a%20listener%20when%20called.
window.addEventListener("load", () => {

    container = document.getElementById("target");
    let url = "un_sustainability_goal_12.json";
    fetch(url)
            .then(response => response.json())
            .then(jsonData =>
            {
                goal = jsonData.goal;


                goal.targets.forEach(target => {
                    target.examples.forEach(example => {
                        example.isFavourite = Math.random() < 0.33;
                    });
                });
                displayData();
            }).catch(err =>
    {
        console.error(err);
        container.innerHTML = "Failed to load data";
    });
    document.getElementById("closeInfoModal").onclick = closeInfoModal;
    //had an issue where i couldnt get error handling to work but learned fetch() returns a promise and how to use .catch in : https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises#error_handling
});
function switchSortTargets()
{
    if (sortBy === "ascending")
    {
        sortBy = "descending";
    } else
    {
        sortBy = "ascending";
    }
    sortTargets();
}

function sortTargets()
{
    if (sortBy === "ascending")
    {
        goal.targets.sort((a, b) => a.id < b.id ? -1 : 1);
        document.getElementById("sortTarget").innerHTML = "Target &#8593";
    } else if (sortBy === "descending")
    {
        goal.targets.sort((a, b) => a.id < b.id ? 1 : -1);
        document.getElementById("sortTarget").innerHTML = "Target &#8595";
    }
    //learned about being able to add something after a and b from https://www.w3schools.com/js/js_array_sort.asp where they sort by .year
    displayData();
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
            <th id = "sortTarget">Target &#8593</th>
            <th id = "sortTarget">Description</th>
        </tr>
        `;

    goal.targets.forEach((target, index) =>
    {
        const favourite = target.isFavourite ? "&#9733 Favourited" : "&#9734";
        htmlString += `
        <tr data-index="${index}" class = "target_row">
                <td>${target.number}</td>
                <td>${target.description}</td>
            `;

    });
    htmlString += `</table>`;
    htmlString += `
        <hr>
        <h3>Links</h3>
        <a href = "${goal.links.official}">${goal.links.official}</a>
        <br>
        <a href = "${goal.links.undp}">${goal.links.undp}</a>
        `;
    container.innerHTML = htmlString;

    document.getElementById("sortTarget").onclick = switchSortTargets;

    document.querySelectorAll(".target_row").forEach(row => {
        row.onclick = () => openInfoModal(goal.targets[row.dataset.index]);
    });
}
function openInfoModal(target)
{
    const infoModal = document.getElementById("infoModal");
    const content = document.getElementById("infoModalContent");

    let html = `<h2>Target ${target.number}</h2>`;

    target.examples.forEach(example => {
        const favourite = example.isFavourite ? "<span>&#9733</span> Favourited" : "<span>&#9734<span>";
        
        html += `
            <h4>${example.title}<span>  ${favourite}</span></h4>
            <p>${example.description}</p>
        `;

        example.images.forEach(img => {
            html += `<img src="${img}" width="200">`;
        });

        html += `<p>Tags: ${example.tags.join(", ")}</p>`;
    });
//learned about .join for arrays from: https://www.w3schools.com/jsref/jsref_join.asp
    content.innerHTML = html;
    infoModal.style.display = "block";
}
function closeInfoModal()
{
    document.getElementById("infoModal").style.display = "none";
}
