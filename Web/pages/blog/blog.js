const SERVER_URL = "http://ugdev.cs.smu.ca:3111"; // URL for ugdev server with a random port selected

var onlinePosts = {}; // JSON Object for storing values obtained from server from mysql database

function clearTextArea() {
    document.getElementById("freeform").value = ""; // This function finds the text entry area and clears out the text
}

function createTextArea(index, isFromGet) { // Function for creating a text area, and other functionality per post, when a post is made
    //Create new text area and create necessary variables
    var textArea = document.createElement("textarea"); // New text area
    var existingTextArea = document.getElementById("freeform"); // Text entry area
    var lineBreak = document.createElement("br"); // Line Break
    var postHeader = document.createElement("h5"); // Per post header
    var deleteButton = document.createElement("button") // Delete button
    var replyButton = document.createElement("button") // Reply button
    var newDiv = document.createElement("div"); //Creates new div for storing everything upon post creation
    var blogAreaDiv = document.getElementById("blogAreaContainer"); // Gets div which contains the entire blog post area (everything below the header bar) 
    var previousDiv = document.getElementById("postAndClearButtons"); // Gets div which contains the post and clear buttons for the text entry area
    var newButtonDiv = document.createElement("div"); // Creates div for holding the reply and delete buttons of each post

    //Editing properties of the created text area (post) and setting the text to the value of the text in the preexisting text area
    textArea.rows = 2;
    textArea.cols = 50;
    textArea.value = existingTextArea.value;
    textArea.readOnly = true;
    textArea.id = "Text Area " + index; // For keeping track of each post created
    console.log(textArea.id); //For logging each created post (and for testing)

    postHeader.textContent = "Posted by anonymous"; // Sets the per post header to say posted by anonymous - ideally will say posted by whoever's google account is logged in but not working yet

    //Configuring delete button
    deleteButton.textContent = "Delete";
    deleteButton.className = "btn btn-outline-danger";
    deleteButton.onclick = deletePost;

    //Configuring reply button
    replyButton.textContent = "Reply";
    replyButton.className = "btn btn-outline-info";
    replyButton.onclick = function() {
        var replyTextArea = document.createElement("textarea"); // Creates new text area when new reply to existing post is created
        var replyDeleteButton = document.createElement("button"); // Creates a delete button for the newly created reply text area

        //Configuring reply text area
        replyTextArea.rows = 2;
        replyTextArea.cols = 40;
        replyTextArea.style.marginLeft = "50px"; // Slight indent for visual differentiation
        replyTextArea.value = existingTextArea.value;
        replyTextArea.readOnly = true;

        //Configuring reply delete button
        replyDeleteButton.textContent = "Delete Reply";
        replyDeleteButton.className = "btn btn-danger";
        replyDeleteButton.onclick = function() {
            this.parentNode.removeChild(replyTextArea); // Removes reply text area, which is a sibling element to "this" (reply delete button)
            this.parentNode.removeChild(this); // Removes itself
        }

        // Inserts reply text area and reply delete button before the new button div created for the replies to structure things in a certain way how they should be on the page
        newDiv.insertBefore(replyTextArea, newButtonDiv);
        newDiv.insertBefore(replyDeleteButton, newButtonDiv);
    };


    //Configuring newDiv which stores post header, text area, newButtonDiv (so basically everything being created by the post button)
    newDiv.style.display = "flex";
    newDiv.style.flexDirection = "column";
    newDiv.style.alignItems = "center";

    blogAreaDiv.insertBefore(newDiv, freeform); // Inserts the newDiv created for storing everything created upon posting, before the text entry area on the page. (So the replies are above the text entry area)
    // Adds the post header and text area to this new div
    newDiv.appendChild(postHeader);
    newDiv.appendChild(textArea);
    // Adds the delete and reply button to their own div
    newButtonDiv.appendChild(deleteButton);
    newButtonDiv.appendChild(replyButton);
    // Adds this button div to the parent div containing everything the post button creates, adds a line break for separation
    newDiv.appendChild(newButtonDiv);
    newDiv.appendChild(lineBreak);

    //SQL for posting value to server
    if (isFromGet == false) { // Strategy implemented to check for where this function is being called from
      var blogContent = existingTextArea.value;
      $.get(SERVER_URL + "/receive", receive).fail(errorCallback1); // Attempts to call the receive function with the returned value from the get function in the server.js
      publish(blogContent); // Attempts to call the publish function with the contents of the text entry area as input
    }
}

function receive(posts) { // Note: Will probably have to differentiate where receive is being called from to avoid creating too many text areas
    // Sets local JSON object (onlinePosts) to contain what is obtained from the server, and compares the values in the console to make sure they are the same (testing/debugging purposes)
    onlinePosts = posts;
    console.log(posts['1'].post);
    console.log(onlinePosts['1'].post);
    
    let postIds = Object.keys(onlinePosts); // Creates a new variable for storing an array containing every post ID stored on the server (in the database)
    
    for (let i = 0; i < postIds.length; i++) { // For loop to loop through each post according to how many post Ids are obtained
      let id = postIds[i]; // Obtains the specific id for whichever corresponding post the current iteration is on
      let post = onlinePosts[id]; // Gets the specific JSON object which the id above is associated with
      createTextArea(i, true); // Creates a new text area with the specific iteration as the id int so I can give it an id element which will tell me which post is which
      let textArea = document.getElementById("Text Area " + i); // Gets the specific newly created text area from this iteration and sets as a variable
      console.log(post.post); // Logs to console for testing/debugging purposes
      textArea.value = post.post; // Sets the specific text area's contents to the corresponding post's contents
    }
}

function setupBox() { // Function called on body load in HTML file
    $.get(SERVER_URL + "/receive", receive).fail(errorCallback1); // Attempts to call the receive function with the returned value from the get function in the server.js
}

function callback1(returnedData) { // Function run if jQuery server actions are successful
    console.log(returnedData);
}

function errorCallback1(err) { // Function run if jQuery server actions are unsuccessful
    console.log(err.responseText);
}

function publish(box) { // Only handles one post worth at the current moment, will have to add an incrementing feature to keep track of indefinite number of posts (yes, this is an inefficient system, but I don't have better ideas at the moment)
    let post = {
      "id": 1,
      "title": "abcdefg", // Will probably remove title variable from database if I don't require it for some purpose
      "post": box,
    };
    $.post(SERVER_URL + "/send", post, callback1).fail(errorCallback1); // Attempts to update the server with newly created posts which will update the database in turn
  }

function deletePost() { // Will need to add capability of deleting posts on the database through some jQuery server post call
    var divToDelete = this.parentNode.parentNode; // Gets grandparent node of the post delete button, in other words, newDiv
    divToDelete.parentNode.removeChild(divToDelete); // Deletes newDiv for specific post this is being called for
}