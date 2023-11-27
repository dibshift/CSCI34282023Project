const SERVER_URL = "http://ugdev.cs.smu.ca:3111";

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
    var replyButton = document.createElement("button")
    var newDiv = document.createElement("div");
    var blogAreaDiv = document.getElementById("blogAreaContainer");
    var previousDiv = document.getElementById("postAndClearButtons");
    var newButtonDiv = document.createElement("div");

    //Editing properties of the created text area and setting the text to the value of the text in the preexisting text area
    textArea.rows = 2;
    textArea.cols = 50;
    textArea.value = existingTextArea.value;
    textArea.readOnly = true;
    postHeader.textContent = "Posted by anonymous";
    deleteButton.textContent = "Delete";
    deleteButton.className = "btn btn-outline-danger";
    deleteButton.onclick = deletePost;
    replyButton.textContent = "Reply";
    replyButton.className = "btn btn-outline-info";
    replyButton.onclick = function() {
        var replyTextArea = document.createElement("textarea");
        var replyDeleteButton = document.createElement("button");
        replyTextArea.rows = 2;
        replyTextArea.cols = 40;
        replyTextArea.style.marginLeft = "50px";
        replyTextArea.value = existingTextArea.value;
        replyTextArea.readOnly = true;
        replyDeleteButton.textContent = "Delete Reply";
        replyDeleteButton.className = "btn btn-danger";
        replyDeleteButton.onclick = function() {
            this.parentNode.removeChild(replyTextArea);
            this.parentNode.removeChild(this);
        }
        newDiv.insertBefore(replyTextArea, newButtonDiv);
        newDiv.insertBefore(replyDeleteButton, newButtonDiv);
    };
    newDiv.style.display = "flex";
    newDiv.style.flexDirection = "column";
    newDiv.style.alignItems = "center";

    //Insert new text area above existing text area and a line break to position it properly
    blogAreaDiv.insertBefore(newDiv, freeform);
    newDiv.appendChild(postHeader);
    newDiv.appendChild(textArea);
    newButtonDiv.appendChild(deleteButton);
    newButtonDiv.appendChild(replyButton);
    newDiv.appendChild(newButtonDiv);
    newDiv.appendChild(lineBreak);

    //SQL for posting value to server
    var blogContent = existingTextArea.value;
    $.get(SERVER_URL + "/receive", receive).fail(errorCallback1);
    publish(blogContent);
}

function receive(posts) {
    onlinePosts = posts;
    for (let i in posts) {
      if (posts[i]["posted"] == true) {
        $("#publish" + i).attr("checked", true);
      }
    }
  
}

function setupBox(box) {

    // let toggles = document.querySelectorAll(".switch input");
    // let editArea = document.getElementById("editArea");
  
    // editArea.style.display = 'table-cell';
    // activeBox = box;
    var retrievedBoxObject = JSON.parse(window.localStorage.getItem('box' + box.toString()));
    // @ts-ignore
    blogContent = retrievedBoxObject;
    // Make other toggles disabled when edit1 is selected - Devin
    for (let i of toggles) {
          // @ts-ignore
          i.disabled = true;
      }
    // if post is posted, disable textbox and put the contents of whats online
    if (onlinePosts[box.toString()]["posted"] == true) {
      // @ts-ignore
      blogContent = onlinePosts[box.toString()]["post"];
      // @ts-ignore
    //   document.getElementById("textInputBox").disabled = true;
    }
}

function callback1(returnedData) {
    console.log(returnedData);
  }

function errorCallback1(err) {
    console.log(err.responseText);
}

function publish(box) {
    let post = {
      "id": 1,
      "title": "abcdefg", // temp
      "post": box,
    };
    $.post(SERVER_URL + "/send", post, callback1).fail(errorCallback1);
    // update local copy of whats online (bad temp solution (do better)) - Devin
    // onlinePosts[box.toString()]["posted"] = publish;
  }

function deletePost() {
    var divToDelete = this.parentNode.parentNode;

    divToDelete.parentNode.removeChild(divToDelete);
    // var previousElement1 = this.previousElementSibling;
    // var previousElement2 = previousElement1.previousElementSibling;
    // var previousElement3 = previousElement2.previousElementSibling;

    // if (previousElement1) {
    //     previousElement1.parentNode.removeChild(previousElement1);
    // }

    // if (previousElement2) {
    //     previousElement2.parentNode.removeChild(previousElement2);
    // }
    
    // if (previousElement3) {
    //     previousElement3.parentNode.removeChild(previousElement3);
    // }
    // this.parentNode.removeChild(this);
}

function deleteReplyPost() {
    var divToDelete = this.parentNode;
}

function replyToPost(mainTextArea) {
    var blogContent = mainTextArea.value
    var textArea = document.createElement("textarea");

    textArea.rows = 2;
    textArea.cols = 50;
    textArea.value = existingTextArea.value;
    textArea.readOnly = true;
}