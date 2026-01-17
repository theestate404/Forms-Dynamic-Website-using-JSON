let uniqueTags = [];
let sortedTags = [];
let inputTag = null;
window.addEventListener("load", () => {
    let url = "un_sustainability_goal_12.json";

    fetch(url)
            .then(response => response.json())
            .then(jsonData => {
                const data = jsonData.goal.targets;

                // Collect all tags
                const allTags = data.flatMap(target =>
                    target.examples.flatMap(example => example.tags)
                // Learned how to use .flatMap: https://stackoverflow.com/questions/75240486/how-to-flatten-nested-array-of-objects-and-create-new-array#comment136050047_75240486
                );

                // Remove duplicates
                uniqueTags = [...new Set(allTags)];
                // Removing duplicates from an array: https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-a-javascript-array
                sortedTags = [...uniqueTags].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
                // Sorting case insensitivehttps://stackoverflow.com/questions/8996963/how-to-perform-case-insensitive-sorting-array-of-string-in-javascript?utm_source=chatgpt.com

            })
            .catch(err => console.error("Error loading JSON:", err));

    document.getElementById("closeTagModal").onclick = closeTagModal;
    document.getElementById("addTagButton").onclick = () =>
    {
        let newTag = document.getElementById("tagInput").value;
        if (newTag && !uniqueTags.includes(newTag.toLowerCase()))
        {
            uniqueTags.push(newTag);
            sortedTags = [...uniqueTags].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
            newTag = "";
            openTagModal();
        }

    };
    document.getElementById("removeTagButton").onclick = () =>
    {
        let tagToRemove = document.getElementById("tagInput").value;
        if (tagToRemove)
        {
            uniqueTags = uniqueTags.filter(t => t.toLowerCase() !== tagToRemove.toLowerCase());
            sortedTags = [...uniqueTags].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        }
        tagToRemove = "";
        openTagModal();
    };
});


function openTagModal()
{
    const container = document.getElementById('tagModalContent');
    container.innerHTML = "";
    // Display tags
    sortedTags.forEach(tag => {
        const span = document.createElement('span');
        // Learned how to use .createElement: https://www.w3schools.com/jsref/met_document_createelement.asp
        span.className = 'tag';
        // Learned to use .classname: https://www.w3schools.com/jsref/prop_html_classname.asp
        span.textContent = tag;

        container.appendChild(span);
    });

    document.getElementById("tagModal").style.display = "block";
}
function closeTagModal() {
    document.getElementById("tagModal").style.display = "none";
}