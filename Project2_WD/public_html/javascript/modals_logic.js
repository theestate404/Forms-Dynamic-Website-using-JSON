function openInfoModal(target)
{
    displayInfoModal(target);
    document.getElementById("infoModal").showModal(); 
}
function closeInfoModal()
{
    document.getElementById("infoModal").close();
}
function openTagModal() {
    getTags(); // rebuilds sortedTags from actual data

    const container = document.getElementById('tagModalContent');
    container.innerHTML = "";

    // Merge sortedTags with pendingTags for display
    const displayTags = [...new Set([...sortedTags, ...pendingTags])]
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    displayTags.forEach(tag => {
        container.innerHTML += `<span class="tag">${tag}</span>`;
    });

    document.getElementById("tagModal").showModal();
}
function closeTagModal() 
{
    document.getElementById("tagModal").close();
}
function openModifyTagModal()
{
    document.getElementById("modifyTagModal").showModal();
}
function closeModifyTagModal()
{
    document.getElementById("modifyTagModal").close();
}
function deleteConfirmationWindow()
{
    document.getElementById("deleteModal").showModal();//IT'S NOT CURRENTLY WORKING
}
function closeDeleteConfirmationWindow()
{
    document.getElementById("deleteModal").close();
}