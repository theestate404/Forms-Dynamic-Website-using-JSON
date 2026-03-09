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
    document.getElementById("editTargetWindow").style.display = "none";
    document.getElementById("editExampleWindow").style.display = "none";
}
function openTagManager()
{
    renderTags();

    document.getElementById("tagManager").style.display = "block";
    document.getElementById("databaseTable").style.display = "none";
    document.getElementById("addManager").style.display = "none";
    document.getElementById("editTargetWindow").style.display = "none";
    document.getElementById("editExampleWindow").style.display = "none";
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
    document.getElementById("editTargetWindow").style.display = "none";
    document.getElementById("editExampleWindow").style.display = "none";
    document.getElementById("addManager").style.display = "block";
}
function toggleMenu()
{
    const menu = document.getElementById("navMenu");
    menu.classList.toggle("show");
}
function deleteConfirmationWindow(targetNum)
{
    //populating <p> message
    let message = document.getElementById("messageDelete");
    //build message
    let htmlString = `Are you sure you want to delete <span class = "boldHighlight">Target ${targetNum}</span>?`;
    //puts message in <p>
    message.innerHTML = htmlString;
    document.getElementById("deleteModal").showModal();
}
function closeDeleteConfirmationWindow()
{
    document.getElementById("deleteModal").close();
}