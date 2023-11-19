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

    //Editing properties of the created text area and setting the text to the value of the text in the preexisting text area
    textArea.rows = 2;
    textArea.cols = 50;
    textArea.value = existingTextArea.value;
    textArea.readOnly = true;
    postHeader.textContent = "Posted by anonymous";

    //Insert new text area above existing text area and a line break to position it properly
    container.insertBefore(postHeader, existingTextArea);
    container.insertBefore(textArea, existingTextArea);
    container.insertBefore(lineBreak, existingTextArea);

    //SQL for posting value to server
}