function displayEditTarget(target)
{
    document.getElementById("tagManager").style.display = "none";
    document.getElementById("databaseTable").style.display = "none";
    document.getElementById("addManager").style.display = "none";
    document.getElementById("editTargetWindow").style.display = "block";
                                                //changing onclick to onsubmit to check patterns first https://stackoverflow.com/questions/5195933/with-form-validation-why-onsubmit-return-functionname-instead-of-onsubmit
                                                //seed idea expanded and looked for a proper integration with chat gpt https://chatgpt.com/c/699c7bc3-5adc-838e-8e06-4afdb355c5b0
    let htmlString = `
    <h2>Modifying Target ${target.number}</h2>
        <h2 class = "error" id = "tagError"></h2>
            <form id = "editForm" onsubmit="return saveModifyTarget(${target.id})"> 
                <div class= "card">
                    <label>Number</label>
                    <input type="text" id="modifyTargetNumber" value="${target.number}" placeholder="Number" required pattern = "^[1-9][0-9]*\.[0-9]+$" title = "Enter a decimal number starting from 1 (example: 1.4, 13.22).">
                    <label>Description</label>
                    <textarea id="modifyTargetDescription" placeholder="Description">${target.description}</textarea>
                    <small>This field can't be empty. Please enter a description.</small>
                    <p class = "error" id = "targetDescriptionError"></p>
                </div>
                <h2>Examples</h2>`;
    target.examples.forEach((example, index) => {
        htmlString += `
            <div class="card">
                <h3>Title</h3>
                <input type="text" id="modifyExampleTitle_${index}" value="${example.title}" placeholder="Title">
                <small>This field can't be empty. Please enter a title.</small>
                <p class = "error" id = "exampleTitleError_${index}"></p>
                <h3>Description</h3>
                <textarea id="modifyExampleDescription_${index}" placeholder="Description" required minlength="1" title = "This field can't be empty. Please enter a description.">${example.description}</textarea>
                <small>This field can't be empty. Please enter a description.</small>
                <p class = "error" id = "exampleDescriptionError_${index}"></p>
                <h3>Images</h3>
                <div id="imageContainer_${index}">`;
        example.images.forEach((img, imgIndex) => {

            htmlString += `
            <div class="imageRow">
                <h5>Current Image</h5>
                <img src="${img}" class="previewImage">

                <input 
                    type="file"
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
            <button type= "button" onclick="addImageInput(${index})">
                Add Image
            </button><br>    
                <h3>Tags (comma separated)</h3>
                <input type="text" id="modifyExampleTags_${index}" value="${example.tags.join(', ')}" placeholder="Tags">
                <h5>Available Tags</h5>
                <p>${displayTags.map(tag => `<span class = "tag">${tag}</span>`).join(" ")}</p>
                <h3>Favourite</h3>
                <label class = "labelButton"><input type="checkbox" id="modifyExampleFavourite_${index}" ${example.isFavourite ? 'checked' : ''}> Favourite?</label><br>
                <div><br>
                    <h3>Rating</h3>
                    <label class = "labelButton"><input type="radio" name="rating_${index}" value="0" ${example.rating_random === 0 ? "checked" : ""}> 0</label><br>
                    <label class = "labelButton"><input type="radio" name="rating_${index}" value="1" ${example.rating_random === 1 ? "checked" : ""}> 1</label><br>
                    <label class = "labelButton"><input type="radio" name="rating_${index}" value="2" ${example.rating_random === 2 ? "checked" : ""}> 2</label><br>
                    <label class = "labelButton"><input type="radio" name="rating_${index}" value="3" ${example.rating_random === 3 ? "checked" : ""}> 3</label><br>
                    <label class = "labelButton"><input type="radio" name="rating_${index}" value="4" ${example.rating_random === 4 ? "checked" : ""}> 4</label><br>
                    <label class = "labelButton"><input type="radio" name="rating_${index}" value="5" ${example.rating_random === 5 ? "checked" : ""}> 5</label><br>
                </div>
            </div>
        `;
        // it checks if the example is favourited or not, checkbox starts checked if it is
    });
    htmlString += `
        <div>
            <button type="submit">Save All</button>
            <button type="button" onclick="openDatabaseTable()">Cancel</button>
        </div>
        </form>
        `;
    document.getElementById("editTargetWindow").innerHTML = htmlString;
}
function addImageInput(exampleIndex)
{

    let container = document.getElementById(`imageContainer_${exampleIndex}`);

    let count = container.querySelectorAll("input").length;

    let htmlString = `
    <div class="imageRow">

        <img src="" class="previewImage">

        <input
            type="text"
            id="modifyExampleImage_${exampleIndex}_${count}"
            accept = "image/*"
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
function removeImage(button)
{
    button.parentElement.remove();
}
function saveModifyTarget(targetId)
{
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
    if (!target)
        return false;
    if (document.getElementById("modifyTargetNumber").value === "")
    {
        console.log("Error displayed");
        document.getElementById("targetNumberError").innerHTML = targetNumberError;
        caughtError = true;
    } else
    {
        target.number = document.getElementById("modifyTargetNumber").value;
    }

    if (document.getElementById("modifyTargetDescription").value === "")
    {
        console.log("Error displayed");
        document.getElementById("targetDescriptionError").innerHTML = targetDescriptionError;
        caughtError = true;
    } else
    {
        target.description = document.getElementById("modifyTargetDescription").value;
    }
    target.examples.forEach((example, index) => {
        if (document.getElementById(`modifyExampleTitle_${index}`).value === "")
        {
            document.getElementById(`exampleTitleError_${index}`).innerHTML = exampleTitleError;
            caughtError = true;
        } else
        {
            example.title = document.getElementById(`modifyExampleTitle_${index}`).value;
        }
        example.description = document.getElementById(`modifyExampleDescription_${index}`).value;
        let rating = document.querySelector(`input[name="rating_${index}"]:checked`);
        example.images = [];
        let container = document.getElementById(`imageContainer_${index}`);
        let rows = container.querySelectorAll(".imageRow");
        rows.forEach(row => {
            let previewImage = row.querySelector(".previewImage");
            let fileInput = row.querySelector("input[type = 'file']");
            if (fileInput.files.length > 0)
            {
                example.images.push(URL.createObjectURL(fileInput.files[0]));
            } 
            else if (previewImage && previewImage.src)
            {
                example.images.push(previewImage.src);
            }        
            //Learned about how files are stored and how to limit to images https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file
            //Learned about how to create an on object url for a blob/File https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static
        })
        let inputTags = document.getElementById(`modifyExampleTags_${index}`).value.split(',');
        inputTags.forEach(tagText =>
        {
            tagText = tagText.trim();

            if (!displayTags.includes(tagText))
            {
                console.log(tagText);
                errorTags.push(tagText);
                missingTag = true;
            } else
            {
                example.tags = inputTags;
            }
        });
        example.isFavourite = document.getElementById(`modifyExampleFavourite_${index}`).checked;
        //Found how to see if a checkbox is checked https://stackoverflow.com/questions/9887360/how-can-i-check-if-a-checkbox-is-checked

        example.rating_random = Number(rating.value);
        //How to convert a String into an int https://stackoverflow.com/questions/1133770/how-can-i-convert-a-string-to-an-integer-in-javascript
    });
    if (missingTag)
    {
        tagErrorMessage = "Tag(s): " + errorTags.join(', ') + " not found";
        document.getElementById("tagError").innerHTML = tagErrorMessage;
        document.documentElement.scrollTop = 0;
        // Found how to scroll https://stackoverflow.com/questions/4210798/how-to-scroll-to-top-of-page-with-javascript-jquery
        caughtError = true;
    }
    if (caughtError)
    {
        return false;
    }
    displayData();       // refresh table
    openDatabaseTable();
    return false; //prevents page to refresh after saving
}

