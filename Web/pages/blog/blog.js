/**
 * Main blog functionality script
 * Known issues: sometimes multiple (usually two) posts appear on the screen when pressing "Post" once. This usually happens when nothing is stored in database and thus nothing is loaded on page load. 
 * Only one of these posts is stored so it is back to normal on page refresh.
 * Also, delete button is displayed for every user, not just "administrator accounts" since efforts with getting google login to work have fallen through.
 * 
 * Written by Connor MacNeil and ChatGPT
 */

const SERVER_URL = "http://ugdev.cs.smu.ca:3111"; // URL for ugdev server with a random port selected

var onlinePosts = {}; // JSON Object for storing values obtained from server from mysql database
var pageLoadedFlag = false;

/**
 * Clears the text entry area so new text can be inputted as desired.
 */
function clearTextArea() {
    document.getElementById("freeform").value = ""; // This function finds the text entry area and clears out the text
}

/**
 * Creates text area when user posts, also creates text areas when page is loaded
 * 
 * @param {*} index Index implemented for naming/storing post ids
 * @param {*} isFromReceive Determines whether this function was called from HTML or from the receive function
 */
function createTextArea(index, isFromReceive) { // Function for creating a text area, and other functionality per post, when a post is made
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
    index = Object.keys(onlinePosts).length + 1; // Index for post created at one number larger than length of JSON object storing posts
    textArea.id = "Text Area " + index; // For keeping track of each post created

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
        replyTextArea.value = existingTextArea.value; // Sets reply text to text in entry area
        replyTextArea.readOnly = true; // Makes replies read only so they can't be edited after post

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

    blogAreaDiv.insertBefore(newDiv, freeform); // Inserts the newDiv created for storing everything created upon posting, before the text entry area on the page. (So the posts are above the text entry area)
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
    if (isFromReceive == false) { // Strategy implemented to check for where this function is being called from
      var blogContent = existingTextArea.value;
      $.get(SERVER_URL + "/receive", receive).fail(errorCallback1); // Attempts to call the receive function with the returned value from the get function in the server.js
      publish(blogContent); // Attempts to call the publish function with the contents of the text entry area as input
    }
}

/**
 * Receive function for getting data from the server
 * 
 * @param {*} posts Retrieved posts variable from server (for each post posted)
 */
function receive(posts) {
    onlinePosts = posts; // Sets local JSON object (onlinePosts) to contain what is obtained from the server
    
    let postIds = Object.keys(onlinePosts); // Creates a new variable for storing an array containing every post ID stored on the server (in the database)
    if (pageLoadedFlag == false) { //Strategy for checking if this function was already run from setupBox() (on page load setup)
        for (let i = 0; i < postIds.length; i++) { // For loop to loop through each post according to how many post Ids are obtained
            let id = postIds[i]; // Obtains the specific id for whichever corresponding post the current iteration is on
            let post = onlinePosts[id]; // Gets the specific JSON object which the id above is associated with
            if (post.post.trim() !== "") { // If the JSON object for this specific id is not empty, load a text area for it
                createTextArea(i + 1, true); // Creates a new text area with the specific iteration as the id int so I can give it an id element which will tell me which post is which
                let textArea = document.getElementById("Text Area " + (i + 1)); // Gets the specific newly created text area from this iteration and sets as a variable
                textArea.value = post.post; // Sets the specific text area's contents to the corresponding post's contents
                pageLoadedFlag = true; // After this initial page load, set the flag to true so this doesn't load more
            }
        }
    }
}

/**
 * Function called on body load in HTML file
 */
function setupBox() {
    $.get(SERVER_URL + "/receive", receive).fail(errorCallback1); // Attempts to call the receive function with the returned value from the get function in the server.js
}

/**
 * Function run if server actions are successful (specifically for post actions)
 * 
 * @param {*} returnedData // Data returned from server if successful
 */
function callback1(returnedData) {
    console.log(returnedData); // Logs returned data
}

/**
 * Function run if server actions are unsuccessful
 * 
 * @param {*} err Error for if server actions fail
 */
function errorCallback1(err) {
    console.log(err.responseText); // Logs the error response text
}

/**
 * Publishes (sends) post data to server
 * 
 * @param {*} box Post data to be passed
 */
function publish(box) {
    // Determines what ID to use for data being sent
    let postIds = Object.keys(onlinePosts);
    let nextPostId = postIds.length + 1;
    // Sets data for JSON object being sent
    let post = {
      "id": nextPostId,
      "post": box,
    };
    $.post(SERVER_URL + "/send", post, callback1).fail(errorCallback1); // Attempts to update the server with newly created posts which will update the database in turn
}

/**
 * Functionality for deleting posts on the page
 */
function deletePost() {
    var divToDelete = this.parentNode.parentNode; // Gets grandparent node of the post delete button, in other words, newDiv
    var postToDelete = getElementsByIdStartsWith(divToDelete, "textarea", "Text Area"); // Finds element of the post which is being deleted
    var postId = postToDelete.slice(10); // Gets just the number out of the ID found for the post being deleted
    divToDelete.parentNode.removeChild(divToDelete); // Deletes newDiv for specific post this is being called for
    let post = {
         "id": postId,
         "post": "",
    };
    $.post(SERVER_URL + "/delete", post, callback1).fail(errorCallback1); // Posts data to the server at the /delete endpoint (post variable sent with newly emptied post value)
}

/**
 * Written by ChatGPT
 * 
 * @param {*} selectorTag element tag being searched
 * @param {*} text id starts with "text"
 * @returns all selectorTag elements whose ID starts with 'text'
 */
function getElementsByIdStartsWith(parentElement, selectorTag, text) {
    var items = [];
    var myPosts = parentElement.getElementsByTagName(selectorTag);
    for (var i = 0; i < myPosts.length; i++) {
        if (myPosts[i].id.indexOf(text) === 0) {
            return myPosts[i].id;
        }
    }
    return items;
}

