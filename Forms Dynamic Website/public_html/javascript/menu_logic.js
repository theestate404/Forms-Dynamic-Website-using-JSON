function openInfoModal(target)
{
    displayInfoModal(target);
    document.getElementById("infoModal").showModal(); 
}
function closeInfoModal()
{
    document.getElementById("infoModal").close();
}
function openDatabaseTable()
{
    document.getElementById("tagManager").style.display = "none";
    document.getElementById("databaseTable").style.display = "block";
    document.getElementById("addManager").style.display = "none";
}
function openTagManager() 
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

    document.getElementById("tagManager").style.display = "block";
    document.getElementById("databaseTable").style.display = "none";
    document.getElementById("addManager").style.display = "none";
}
function openAddManager()
{
    document.getElementById("tagManager").style.display = "none";
    document.getElementById("databaseTable").style.display = "none";
    document.getElementById("addManager").style.display = "block";
}
function toggleMenu() 
{
    const menu = document.getElementById("navMenu");
    menu.classList.toggle("show");
}