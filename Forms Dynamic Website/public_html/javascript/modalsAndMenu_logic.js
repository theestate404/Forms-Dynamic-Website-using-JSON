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
    renderTags();

    document.getElementById("tagManager").style.display = "block";
    document.getElementById("databaseTable").style.display = "none";
    document.getElementById("addManager").style.display = "none";
}
function openModifyTagModal()
{
    document.getElementById("modifyTagModal").showModal(); 
}
function closeModifyTagModal()
{
    document.getElementById("modifyTagModal").close();
}

//OPENING THE ADD TARGET
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
function deleteConfirmationWindow()
{
    document.getElementById("deleteModal").showModal();//IT'S NOT CURRENTLY WORKING
}
function closeDeleteConfirmationWindow()
{
    document.getElementById("deleteModal").close();
}

//THE BUTTON TO OPEN MENU TO DELETE AND EDIT EACH CARD
function toggleCardMenu(index) {
    let menu = document.getElementById(`cardMenu${index}`);
    menu.classList.toggle("show");
}