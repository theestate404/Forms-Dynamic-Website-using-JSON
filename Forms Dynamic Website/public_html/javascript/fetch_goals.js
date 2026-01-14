let sortBy = "ascending";
let goal = null;
let container = null;
window.onload = () =>
        {
            let url = 'un_sustainability_goal_12.json';
            
            fetch(url)
                    .then(response => response.json())
                    .then(jsonData =>
                    {
                        goal = jsonData.goal;
                        container = document.getElementById("target");
                        
                        goal.targets.forEach(target => {
                            target.isFavourite = Math.random() < 0.33;
                        });
                        displayData();
                    })
                    .catch(err =>
                    {
                        console.error(err);
                        container.innerHTML = "Failed to load data";
                    });
                    document.getElementById("sortButton").onclick = switchSortBy;
        };
function switchSortBy()
{
    if (sortBy === "ascending")
    {
        sortBy = "descending";
    }
    else if (sortBy === "descending")
    {
        sortBy = "favourites";
    }
    else
    {
        sortBy = "ascending";
    }
    sortTargetsBy();
}
function sortTargetsBy()
{
    if (sortBy === "ascending")
    {
        goal.targets.sort((a, b) => a.id < b.id ? -1 : 1);
        document.getElementById("sortButton").innerHTML = "Sort Ascending &#8593";
    }
    else if (sortBy === "descending")
    {
        goal.targets.sort((a, b) => a.id < b.id ? 1 : -1);
        document.getElementById("sortButton").innerHTML = "Sort Descending &#8595";
    }
    else
    {
        
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
    <table border = "5" width = "100%" align = "center">
        <tr>
            <td>Favourite</td>
            <td>Target</td>
            <td>Description</td>
            <td>Example 1</td>
            <td>Example 2</td>
        </tr>
        `;

    goal.targets.forEach(target =>
    {
        const favourite = target.isFavourite ? "&#9733 Favourited" : "&#9734";
        htmlString += `
        <tr>
                <td>${favourite}</td>
                <td>${target.number}</td>
                <td>${target.description}</td>
            `;

        target.examples.forEach(example =>
        {
            htmlString += `
                <td>
                    <h4>${example.title}</h4>
                    <p>${example.description}</p>
                
                    `;
            let imagesString = "";
            example.images.forEach(img =>
            {
                imagesString += `<img src="${img}" width="200">
                `;
            });
            htmlString += `
                <div>${imagesString}</div>
                
                Tags: ${example.tags.join(", ")}
                </td>
                `;
            //learned about .join for arrays from: https://www.w3schools.com/jsref/jsref_join.asp
            //learned about .map for arrays from: https://www.w3schools.com/jsref/jsref_map.asp    
        });
        htmlString += `</tr>`;    
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
}


