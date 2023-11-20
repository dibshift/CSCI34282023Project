function clearTextArea() {
    document.getElementById("freeform").value = "";
}

function createTextArea() {
    //Create new text area and create necessary variables
    var textArea = document.createElement("textarea");
    var container = document.getElementById("blogAreaContainer");
    var existingTextArea = document.getElementById("freeform");
    var lineBreak = document.createElement("br");
    var postHeader = document.createElement("h5");
    var deleteButton = document.createElement("button")
    var newDiv = document.createElement("div");
    var blogAreaDiv = document.getElementById("blogAreaContainer");
    var previousDiv = document.getElementById("postAndClearButtons");

    //Editing properties of the created text area and setting the text to the value of the text in the preexisting text area
    textArea.rows = 2;
    textArea.cols = 50;
    textArea.value = existingTextArea.value;
    textArea.readOnly = true;
    postHeader.textContent = "Posted by anonymous";
    deleteButton.textContent = "Delete";
    deleteButton.className = "btn btn-outline-danger";
    deleteButton.onclick = deletePost;
    newDiv.style.display = "flex";
    newDiv.style.flexDirection = "column";
    newDiv.style.alignItems = "center";

    //Insert new text area above existing text area and a line break to position it properly
    blogAreaDiv.insertBefore(newDiv, freeform);
    newDiv.appendChild(postHeader);
    newDiv.appendChild(textArea);
    newDiv.appendChild(deleteButton);
    newDiv.appendChild(lineBreak);

    //SQL for posting value to server
}

function deletePost() {
    var previousElement1 = this.previousElementSibling;
    var previousElement2 = previousElement1.previousElementSibling;

    if (previousElement1) {
        previousElement1.parentNode.removeChild(previousElement1);
    }

    if (previousElement2) {
        previousElement2.parentNode.removeChild(previousElement2);
    }
    this.parentNode.removeChild(this);
}