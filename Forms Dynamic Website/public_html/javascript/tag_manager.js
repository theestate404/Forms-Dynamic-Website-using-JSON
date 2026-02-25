let uniqueTags = [], sortedTags = [], pendingTags = [], inputTag = null;
/*-------------Tags are collected from JSON and sorted -----------------*/
function getTags()
{
    const data = goal.targets;
    // Collect all tags from all examples
    const allTags = data.flatMap(target =>
        target.examples.flatMap(example => example.tags)
    // Learned how to use .flatMap: https://stackoverflow.com/questions/75240486/how-to-flatten-nested-array-of-objects-and-create-new-array#comment136050047_75240486
        );

    // Remove duplicates
    uniqueTags = [...new Set(allTags)];
    // Removing duplicates from an array: https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-a-javascript-array
    
    
    sortedTags = [...uniqueTags].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    // Sorting case insensitivehttps://stackoverflow.com/questions/8996963/how-to-perform-case-insensitive-sorting-array-of-string-in-javascript
}
function renderTags()
{
    getTags(); // rebuilds sortedTags from actual data

    const container = document.getElementById('tagManagerContent');
    container.innerHTML = "";

    // Merge sortedTags with pendingTags for display
    const displayTags = [...new Set([...sortedTags, ...pendingTags])]
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    displayTags.forEach(tag => {
        container.innerHTML += `<span class="tag">${tag}</span>`;
    });
}
function addTag()
{
    let newTag = document.getElementById("tagInput").value;
        if (!newTag)
        {
            return;
        }
        if (!pendingTags.includes(newTag) && !uniqueTags.includes(newTag))
        {
            pendingTags.push(newTag);
        }
        renderTags(); // Reopens the modal to show change
}
/*------------Remove Tag---------------*/
function removeTag()
{
    let tagToRemove = document.getElementById("tagInput").value;
        if (!tagToRemove)
        {
            return;
        }
        removeTagEverywhere(tagToRemove) // Removes tag from each example in the json
        uniqueTags = uniqueTags.filter(t => t.toLowerCase() !== tagToRemove.toLowerCase()); // Remove
        pendingTags = pendingTags.filter(t => t.toLowerCase() !== tagToRemove.toLowerCase());
        sortedTags = [...uniqueTags].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        displayData(); // Updates the display with the tag removed
        renderTags();
}
/*----------------Removes Tag from each example if it is there--------------------- */
function removeTagEverywhere(tagToRemove) 
{
    tagToRemove = tagToRemove.toLowerCase();
    goal.targets.forEach(target => {
        target.examples.forEach(example => {
            // Loop backwards to remove items from array (looping forwards skips some tags)
                for (let i = example.tags.length - 1; i >= 0; i--)
                {
                    if(example.tags[i].toLowerCase() === tagToRemove)
                    {
                        example.tags.splice(i, 1); // Remove tag
                    }
                }
        });
    });
}
/*------------------Goes through each example and changes tag-------------------*/
function modifyTag()
{
    const oldTag = document.getElementById("tagToModify").value;
    const newTag = document.getElementById("newModifiedTag").value;
    let foundTag = false;
    
    // Replace oldTag with newTag in all examples
    goal.targets.forEach(target => {
        target.examples.forEach(example => {
            for(let i = 0; i < example.tags.length; i++)
            {
                if(example.tags[i] === oldTag)
                {
                    example.tags[i] = newTag;
                    foundTag = true;
                }
            }
        });
    });
    for (let i = 0; i < pendingTags.length; i++) 
    {
        if (pendingTags[i] === oldTag) 
        {
            pendingTags[i] = newTag;
        }
    }  
    if(foundTag)
    {
        console.log("Tag modified");
        getTags(); //rebuild unique and sorted arrays with modified tag
        displayData(); //updates data shown
    }
    else
    {
        console.log("Tag not modified");
    }
}
function submitModifyTag()
{
    modifyTag(); // Modify tag in all examples
    closeModifyTagModal();//Closes the modify modal
    renderTags();
}