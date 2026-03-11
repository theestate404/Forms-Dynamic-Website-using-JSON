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
    document.getElementById("editTargetWindow").style.display="none";
    document.getElementById("editExampleWindow").style.display="none";
}
function openTagManager() 
{
    renderTags();

    document.getElementById("tagManager").style.display = "block";
    document.getElementById("databaseTable").style.display = "none";
    document.getElementById("addManager").style.display = "none";
    document.getElementById("editTargetWindow").style.display="none";
    document.getElementById("editExampleWindow").style.display="none";
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
    document.getElementById("editTargetWindow").style.display="none";
    document.getElementById("editExampleWindow").style.display="none";
    document.getElementById("addManager").style.display = "block";
    
    displayAvailableTags();
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

function toggleMenu()
{
    const menu = document.getElementById("navMenu")
    const btn = document.getElementById("hamburgerButton")

    menu.classList.toggle("show");

    if (menu.classList.contains("show"))
        btn.innerHTML = "✕"
    else
        btn.innerHTML = "☰"
}

function toggleCardMenu(index)
{
    const menu = document.getElementById("cardMenu" + index);

    if (menu.classList.contains("show"))
    {
        menu.classList.remove("show")
    } else
    {
        menu.classList.add("show")
    }
}