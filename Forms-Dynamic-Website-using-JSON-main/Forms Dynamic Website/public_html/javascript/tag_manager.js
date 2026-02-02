let uniqueTags = [], sortedTags = [], inputTag = null
window.addEventListener("load", () =>
{
    document.getElementById("closeTagModal").onclick = closeTagModal
    document.getElementById("addTagButton").onclick = () =>
    {
        let newTag = document.getElementById("tagInput").value
        if (newTag && !uniqueTags.includes(newTag.toLowerCase()))
        {
            uniqueTags.push(newTag)
            sortedTags = [...uniqueTags].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
            newTag = ""
            openTagModal()
        }

    }
    document.getElementById("removeTagButton").onclick = () =>
    {
        let tagToRemove = document.getElementById("tagInput").value
        if (tagToRemove)
        {
            uniqueTags = uniqueTags.filter(t => t.toLowerCase() !== tagToRemove.toLowerCase())
            sortedTags = [...uniqueTags].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        }

        removeTagEverywhere(tagToRemove)
        displayData()
        tagToRemove = ""
        openTagModal()
    }
})
function getTags()
{
    const data = goal.targets
    // Collect all tags
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

function openTagModal()
{
    getTags()
    const container = document.getElementById('tagModalContent')
    container.innerHTML = ""
    // Display tags
    sortedTags.forEach(tag => {
        const span = document.createElement('span')
        // Learned how to use .createElement: https://www.w3schools.com/jsref/met_document_createelement.asp
        span.className = 'tag'
        // Learned to use .classname: https://www.w3schools.com/jsref/prop_html_classname.asp
        container.innerHTML += `<span class="tag">${tag}</span>`
    })
    document.getElementById("tagModal").showModal()
}
function closeTagModal() 
{
    document.getElementById("tagModal").close()
}
function removeTagEverywhere(tagToRemove) 
{
    tagToRemove = tagToRemove.toLowerCase()
    goal.targets.forEach(target => {
        target.examples.forEach(example => {
            let index
                for (let i = sortedTags.length - 1; i >= 0; i--)
                {
                    if(sortedTags[i].toLowerCase === tagToRemove)
                    {
                        example.tags.splice(index, 1)
                    }
                }
        })
    })
}