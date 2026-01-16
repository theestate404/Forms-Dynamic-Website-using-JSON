window.addEventListener("load", () => {
    let url = "un_sustainability_goal_12.json";
    
    fetch(url)
        .then(response => response.json())
        .then(jsonData => {
            const data = jsonData.goal.targets;

            // Collect all tags
            const allTags = data.flatMap(target => 
                target.examples.flatMap(example => example.tags)
                // Learned how to use .flatMap: https://www.w3schools.com/jsref/jsref_array_flatmap.asp
            );

            // Remove duplicates
            const uniqueTags = [...new Set(allTags)];

            // Display tags
            const container = document.getElementById('tagContainer');
            uniqueTags.forEach(tag => {
                const span = document.createElement('span');
                // Learned how to use .createElement: https://www.w3schools.com/jsref/met_document_createelement.asp
                span.className = 'tag';
                // Learned to use .classname: https://www.w3schools.com/jsref/prop_html_classname.asp
                span.textContent = tag;
                
                container.appendChild(span);
            });
        })
        .catch(err => console.error("Error loading JSON:", err));
});