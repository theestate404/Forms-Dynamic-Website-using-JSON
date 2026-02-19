function openInfoModal(target)
{
    displayInfoModal(target);
    document.getElementById("infoModal").showModal(); 
}
function closeInfoModal()
{
    document.getElementById("infoModal").close();
}
function openTagModal()
{
    console.log(sortedTags)
    const container = document.getElementById('tagModalContent')
    container.innerHTML = ""
    getTags()
    // Display tags
    sortedTags.forEach(tag => {
        container.innerHTML += `<span class="tag">${tag}</span>`
    })
    document.getElementById("tagModal").showModal()
    
}
function closeTagModal() 
{
    document.getElementById("tagModal").close()
}
function openModifyTagModal()
{
    document.getElementById("modifyTagModal").showModal()
}
function closeModifyTagModal()
{
    document.getElementById("modifyTagModal").close()
}