let ascending = true;
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
                        displayData();
                    })
                    .catch(err =>
                    {
                        console.error(err);
                        container.innerHTML = "Failed to load data";
                    });
                    document.getElementById("sortButton").onclick = sort;
        }
function sort()
{
    ascending = !ascending;
    //sorts the data by the id and changes the text in the button when clicked
    if (ascending)
    {
        goal.targets.sort((a, b) => a.id < b.id ? -1 : 1);
        document.getElementById("sortButton").innerHTML = "Sort &#8593";
    }
    else
    {
        goal.targets.sort((a, b) => a.id < b.id ? 1 : -1);
        document.getElementById("sortButton").innerHTML = "Sort &#8595";
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
        `;

    goal.targets.forEach(target =>
    {
        htmlString += `
            <hr>
            <h3>Target ${target.number}</h3>
            <p>${target.description}</p>
            `;

        target.examples.forEach(example =>
        {
            htmlString += `
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
                <p>Tags: ${example.tags.join(", ")}</p>
                `;
            //learned about .join for arrays from: https://www.w3schools.com/jsref/jsref_join.asp
            //learned about .map for arrays from: https://www.w3schools.com/jsref/jsref_map.asp


        });
    });
    htmlString += `
        <hr>
        <h3>Links</h3>
        <a href = "${goal.links.official}">${goal.links.official}</a>
        <br>
        <a href = "${goal.links.undp}">${goal.links.undp}</a>
        `;
    container.innerHTML = htmlString;
}


