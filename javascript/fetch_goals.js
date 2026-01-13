window.onload = () =>
{
    let url = 'un_sustainability_goal_12.json';

    fetch(url)
            .then(response => response.json())
            .then(jsonData =>
            {
                const goal = jsonData.goal;
                const container = document.getElementById("target");

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
            })
            .catch(err =>
            {
                console.error(err);
                container.textContent = "Failed to load data";
            });
}


