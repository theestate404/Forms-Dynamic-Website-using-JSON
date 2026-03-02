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
function openAddManager()
{
    document.getElementById("tagManager").style.display = "none";
    document.getElementById("databaseTable").style.display = "none";
    document.getElementById("editTargetWindow").style.display="none";
    document.getElementById("editExampleWindow").style.display="none";
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
function displayEditTarget(id,target,description){
    document.getElementById("tagManager").style.display = "none";
    document.getElementById("databaseTable").style.display = "none";
    document.getElementById("addManager").style.display = "none";
    document.getElementById("editTargetWindow").style.display="block";
    
    let htmlString =`
    <h2>Modifying Target</h2>
            <form id="modifyTargetForm">
                <div>
                    <div class="card">
                    <label>Target</label>
                    <input type="text" id="targetNumModify" value ="${target}">
                    </div>
                    <div class="card">
                    <label>Description</label>
                    <input type="text" id="descriptionModify" value="${description}">
                    </div>
                    <div>
                        <button type="button" onclick="modifyTarget(${id})">Modify</button>
                        <button type="button" onclick="openDatabaseTable()">Cancel</button>
                    </div>
                </div> 
            </form>
    
`;
    document.getElementById("editTargetWindow").innerHTML = htmlString;
}
function modifyTarget(id){
    let newTargetNum = document.getElementById("targetNumModify").value;
    let newDescription = document.getElementById("descriptionModify").value;
    for(let i=0;i<goal.targets.length;i++){
        if(goal.targets[i].id===id){
            goal.targets[i].number = newTargetNum;
            goal.targets[i].description = newDescription;
        }
    }
    //this updates memory in the table
    displayData();
    //this only UI and doesn't updates the table
    openDatabaseTable();
}
function displayEditExample(title, description, images, tags, rating, favourite){
    closeInfoModal();
    document.getElementById("tagManager").style.display = "none";
    document.getElementById("databaseTable").style.display = "none";
    document.getElementById("addManager").style.display = "none";
    document.getElementById("editExampleWindow").style.display="block";
    
    let htmlString =`
    <h2>Modifying Example</h2>
            <form id="modifyExampleForm">
                <div>
                   <div class="card">
                    <label>Title</label>
                    <input type = "text" value = "${title}">
                    </div>
    <div class="card">
                    <label>Description</label>
                    <input type = "text" value = "${description}">
    </div>
    <div class="card">
                    <label>Images</label>
                    <input type = "text"  value = "${images}">
    </div>
    <div class="card">
                    <label>Taggs</label>
                    <input type = "text" value = "${tags}">
    </div>
    <div class="card">
                    <label>Rating</label>
                    <input type = "text" value = "${rating}">
    </div>
    <div class="card">
                    <label>Favourite</label>
                    <input type = "text" value = "${favourite}">
    </div>
                    <div>
                        <button type="button">Modify</button>
                        <button type="button" onclick="openDatabaseTable()">Cancel</button>
                    </div>
                </div>
            </form>
`;
    document.getElementById("editExampleWindow").innerHTML = htmlString;
}
