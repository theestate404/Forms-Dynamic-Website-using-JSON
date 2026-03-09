function displayEditTarget(target) {
    document.getElementById("tagManager").style.display = "none";
    document.getElementById("databaseTable").style.display = "none";
    document.getElementById("addManager").style.display = "none";
    document.getElementById("editTargetWindow").style.display = "block";

    let htmlString = `
    <h2>Modifying Target ${target.number}</h2>
        <h2 class = "error" id = "tagError"></h2>
            <form id = "editForm">
                <div class= "card">
                    <label>Number</label>
                    <input type="text" id="modifyTargetNumber" value="${target.number}"placeholder="Number">
                    <input type="text" id="modifyTargetNumber" value="${target.number}" placeholder="Number">
                    <label>Description</label>
                    <textarea id="modifyTargetDescription" placeholder="Description">${target.description}</textarea>
                    <p class = "error" id = "targetDescriptionError"></p>
                </div>
                <h2>Examples</h2>`;
    target.examples.forEach((example, index) => {
        htmlString += `
            <div class="card">
                <label>Title</label>
                <input type="text" id="modifyExampleTitle_${index}" value="${example.title}" placeholder="Title">
                <p class = "error" id = "exampleTitleError_${index}"></p>
                <label>Description</label>
                <textarea id="modifyExampleDescription_${index}" placeholder="Description">${example.description}</textarea>
                <p class = "error" id = "exampleDescriptionError_${index}"></p>
                <label>Images</label>
                <div id="imageContainer_${index}">`;
        example.images.forEach((img, imgIndex) => {

            htmlString += `
            <div class="imageRow">

                <img src="${img}" class="previewImage">

                <input 
                    type="text"
                    id="modifyExampleImage_${index}_${imgIndex}"
                    value="${img}"
                >

                <button 
                    type="button"
                    onclick="removeImage(this)"
                >
                    Remove
                </button>

            </div>
            `;
        });
        htmlString += `
            </div>
            <button type="button" onclick="addImageInput(${index})">
                Add Image
            </button>       
                <label>Tags (comma separated)</label>
                <input type="text" id="modifyExampleTags_${index}" value="${example.tags.join(', ')}" placeholder="Tags">
                <h3>Favourite</h3>
                <label><input type="checkbox" id="modifyExampleFavourite_${index}" ${example.isFavourite ? 'checked' : ''}> Favourite?</label><br>
                <h3>Rating</h3>
                <label><input type="radio" name="rating_${index}" value="0" ${example.rating_random == 0 ? "checked" : ""}> 0</label><br>
                <label><input type="radio" name="rating_${index}" value="1" ${example.rating_random == 1 ? "checked" : ""}> 1</label><br>
                <label><input type="radio" name="rating_${index}" value="2" ${example.rating_random == 2 ? "checked" : ""}> 2</label><br>
                <label><input type="radio" name="rating_${index}" value="3" ${example.rating_random == 3 ? "checked" : ""}> 3</label><br>
                <label><input type="radio" name="rating_${index}" value="4" ${example.rating_random == 4 ? "checked" : ""}> 4</label><br>
                <label><input type="radio" name="rating_${index}" value="5" ${example.rating_random == 5 ? "checked" : ""}> 5</label><br>
            </div>
        `;
        // it checks if the example is favourited or not, checkbox starts checked if it is
    });
    htmlString += `
        <div>
            <button type="button" onclick="saveModifyTarget(${target.id})">Save All</button>
            <button type="button" onclick="openDatabaseTable()">Cancel</button>
        </div>
        </form>
        `;
    document.getElementById("editTargetWindow").innerHTML = htmlString;
}
function addImageInput(exampleIndex) {

    let container = document.getElementById(`imageContainer_${exampleIndex}`);

    let count = container.querySelectorAll("input").length;

    let htmlString = `
    <div class="imageRow">

        <img src="" class="previewImage">

        <input
            type="text"
            id="modifyExampleImage_${exampleIndex}_${count}"
            placeholder="Image URL"
        >

        <button
            type="button"
            onclick="removeImage(this)"
        >
            Remove
        </button>

    </div>
    `;
    container.innerHTML += htmlString;
}
function removeImage(button) {
    button.parentElement.remove();
}
function saveModifyTarget(targetId) {

    let errorTags = [];
    let missingTag = false;
    let tagErrorMessage = "";
    let caughtError = false;

    let targetNumberError = "Please input value for Target Number";
    let targetDescriptionError = "Please input value for Target Description";

    let exampleTitleError = "Please input value for Example Title";
    let exampleDescriptionError = "Please input value for Example Description";
    let exampleImageError = "Please import an image";
    let exampleTagError = "";

    const target = goal.targets.find(t => t.id === targetId);
    //found out how to get the first target with matching id https://stackoverflow.com/questions/46415853/javascript-array-find-object-by-property-value
    if (!target) return;
    if (document.getElementById("modifyTargetNumber").value === "") {
        console.log("Error displayed");
        document.getElementById("targetNumberError").innerHTML = targetNumberError;
        caughtError = true;
    }
    else {
        target.number = document.getElementById("modifyTargetNumber").value;
    }

    if (document.getElementById("modifyTargetDescription").value === "") {
        console.log("Error displayed");
        document.getElementById("targetDescriptionError").innerHTML = targetDescriptionError;
        caughtError = true;
    }
    else {
        target.description = document.getElementById("modifyTargetDescription").value;
    }

    target.examples.forEach((example, index) => {
        if (document.getElementById(`modifyExampleTitle_${index}`).value === "") {
            document.getElementById(`exampleTitleError_${index}`).innerHTML = exampleTitleError;
            caughtError = true;
        }
        else {
            example.title = document.getElementById(`modifyExampleTitle_${index}`).value;
        }

        example.description = document.getElementById(`modifyExampleDescription_${index}`).value;

        example.images = [];
        let rating = document.querySelector(`input[name="rating_${index}"]:checked`);

        let container = document.getElementById(`imageContainer_${index}`);

        let inputs = container.querySelectorAll("input");

        inputs.forEach(input => {

            const url = input.value.trim();

            if (url !== "") {
                example.images.push(url);
            }

        });

        let inputTags = document.getElementById(`modifyExampleTags_${index}`).value.split(',');
        inputTags.forEach(tagText => {
            tagText = tagText.trim();

            if (!displayTags.includes(tagText)) {
                console.log(tagText);
                errorTags.push(tagText);
                missingTag = true;
            }
            else {
                example.tags = inputTags;
            }
        });
        example.isFavourite = document.getElementById(`modifyExampleFavourite_${index}`).checked;
        //Found how to see if a checkbox is checked https://stackoverflow.com/questions/9887360/how-can-i-check-if-a-checkbox-is-checked
        
        example.rating_random = Number(rating.value);
        //How to convert a String into an int https://stackoverflow.com/questions/1133770/how-can-i-convert-a-string-to-an-integer-in-javascript
    });
    if (missingTag) {
        tagErrorMessage = "Tag(s): " + errorTags.join(', ') + " not found";
        document.getElementById("tagError").innerHTML = tagErrorMessage;
        document.documentElement.scrollTop = 0;
        // Found how to scroll https://stackoverflow.com/questions/4210798/how-to-scroll-to-top-of-page-with-javascript-jquery
        caughtError = true;
    }
    if (caughtError) {
        return;
    }
    displayData();       // refresh table
    openDatabaseTable();
}

