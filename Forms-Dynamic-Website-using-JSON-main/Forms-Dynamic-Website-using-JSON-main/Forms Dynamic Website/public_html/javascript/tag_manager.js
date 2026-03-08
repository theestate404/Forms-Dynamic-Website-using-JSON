let uniqueTags = [], sortedTags = [], pendingTags = [], displayTags = [], inputTag = null, tagError = "";

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
    displayTags = [...new Set([...sortedTags, ...pendingTags])]
            .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    displayTags.forEach(tag => {
        container.innerHTML += `<span class="tag">${tag}</span>`;
    });
}
function addTag()
{
    let newTag = document.getElementById("tagInput").value;
    tagError = "";
    if (!newTag)
    {
        tagError = "Please enter a tag to add or remove";
        document.getElementById("tagInput_error").innerText = tagError;
        return;
    }
    if (displayTags.includes(newTag))
    {
        tagError = "Tag already exists";
        document.getElementById("tagInput_error").innerText = tagError;
        return;
    }
    pendingTags.push(newTag);
    renderTags(); // Reopens the modal to show change
}
/*------------Remove Tag---------------*/
function removeTag()
{
    let tagToRemove = document.getElementById("tagInput").value;
    if (!tagToRemove)
    {
        tagError = "Please enter a tag to add or remove";
        document.getElementById("tagInput_error").innerText = tagError;
        return;
    }
    const tagExists = displayTags.some(tag => tag === tagToRemove);
    // Wanted to find if an object was in an array https://stackoverflow.com/questions/237104/how-do-i-check-if-an-array-includes-a-value-in-javascript
    
    if (!tagExists)
    {
        document.getElementById("tagInput_error").innerText = "No tag found with that value";
        return;
    }
    removeTagEverywhere(tagToRemove); // Removes tag from each example in the json
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
                if (example.tags[i].toLowerCase() === tagToRemove)
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
    const oldTag = document.getElementById("tagToModify").value.trim();
    const newTag = document.getElementById("newModifiedTag").value.trim();
    const errorElement = document.getElementById("tagToModify_error");
    errorElement.innerText = ""; // clear previous error

    // Check for empty inputs
    if (!oldTag || !newTag) {
        errorElement.innerText = "Please enter tags in both inputs";
        return;
    }

    let exists = false;

// Loop through all tags in uniqueTags
    for (let i = 0; i < uniqueTags.length; i++) {
        // Check if its the same
        if (uniqueTags[i].toLowerCase() === newTag.toLowerCase()) {
            exists = true;
            break; // stop the loop once match is found
        }
    }

    // Show the error if the tag exists
    if (exists) {
        errorElement.innerText = `The tag "${newTag}" already exists`;
        return; // Exit the modifyTag function
    }   
    
    let foundTag = false;
    
    // Loops to modify oldTag to newTag
    goal.targets.forEach(target => {
        target.examples.forEach(example => {
            for (let i = 0; i < example.tags.length; i++) {
                if (example.tags[i].toLowerCase() === oldTag.toLowerCase()) {
                    example.tags[i] = newTag;
                    foundTag = true;
                }
            }
        });
    });

    // If old tag is not found anywhere
    if (!foundTag) {
        errorElement.innerText = `No tag found with the value "${oldTag}"`;
        return;
    }

    // Update pendingTags
    for (let i = 0; i < pendingTags.length; i++) {
        if (pendingTags[i].toLowerCase() === oldTag.toLowerCase()) {
            pendingTags[i] = newTag;
        }
    }

    getTags();
    displayData();
    renderTags();
    return true;
}
function submitModifyTag()
{
    const success = modifyTag();
    if (success)
    {
        closeModifyTagModal();// Closes the modify modal
        renderTags();
    }
}
