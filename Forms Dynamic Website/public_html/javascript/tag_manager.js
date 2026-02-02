let uniqueTags = [], sortedTags = [], inputTag = null
window.addEventListener("load", () =>
{
    
    document.getElementById("closeTagModal").onclick = closeTagModal
    document.getElementById("addTagButton").onclick = () =>
    {
        let newTag = document.getElementById("tagInput").value
        if (!newTag)
        {
            return
        }
        getTags() //Rebuilds unique and sorted arrays
        openTagModal() // Reopens the modal to show change
    }
    // Remove a tag when button is clicked
    document.getElementById("removeTagButton").onclick = () =>
    {
        let tagToRemove = document.getElementById("tagInput").value
        if (!tagToRemove)
        {
            return
        }
        removeTagEverywhere(tagToRemove) // Removes tag from each example in the json
        if (tagToRemove)
        {
            uniqueTags = uniqueTags.filter(t => t.toLowerCase() !== tagToRemove.toLowerCase())
            sortedTags = [...uniqueTags].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        }
        openTagModal() // Reopen modal to show change
        displayData() // Updates the display without the tag removed
    }
    // Open modify Tag modal
    document.getElementById("modifyTagButton").onclick = () =>
    {
        openModifyTagModal()
        document.getElementById("closeModifyTag").onclick = () =>
        {
            closeModifyTagModal()
        }
    }
    // Submit modified Tag
    document.getElementById("submitModifyTag").onclick = () =>
    {
        modifyTag() // Modify tag in all examples
        openTagModal() // Reopens tag modal 
        closeModifyTagModal() //Closes the modify modal
    }
})
function getTags()
{
    const data = goal.targets
    // Collect all tags from all exaples
    const allTags = data.flatMap(target =>
        target.examples.flatMap(example => example.tags)
    // Learned how to use .flatMap: https://stackoverflow.com/questions/75240486/how-to-flatten-nested-array-of-objects-and-create-new-array#comment136050047_75240486
        )

    // Remove duplicates
    uniqueTags = [...new Set(allTags)]
    // Removing duplicates from an array: https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-a-javascript-array
    
    
    sortedTags = [...uniqueTags].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    // Sorting case insensitivehttps://stackoverflow.com/questions/8996963/how-to-perform-case-insensitive-sorting-array-of-string-in-javascript
}
function removeTagEverywhere(tagToRemove) 
{
    tagToRemove = tagToRemove.toLowerCase()
    goal.targets.forEach(target => {
        target.examples.forEach(example => {
            // Loop backwards to remove items from array (looping forwards skips some tags)
                for (let i = example.tags.length - 1; i >= 0; i--)
                {
                    if(example.tags[i].toLowerCase() === tagToRemove)
                    {
                        example.tags.splice(i, 1) // Remove tag
                    }
                }
        })
    })
}
function modifyTag()
{
    const oldTag = document.getElementById("tagToModify").value
    const newTag = document.getElementById("newModifiedTag").value
    let foundTag = false
    
    // Replace oldTag with newTag in all examples
    goal.targets.forEach(target => {
        target.examples.forEach(example => {
            for(let i = 0; i < example.tags.length; i++)
            {
                if(example.tags[i] === oldTag)
                {
                    example.tags[i] = newTag
                    foundTag = true
                }
            }
        })
    })
    
    if(foundTag)
    {
        console.log("Tag modified")
        getTags() //rebuild unique and sorted arrays with modified tag
        displayData() //updates data shown
    }
    else
    {
        console.log("Tag not modified")
    }
}