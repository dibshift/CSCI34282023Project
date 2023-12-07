/**
 * Server side and database storage functionality for blog
 * Known issues: Sometimes there is jank when too many operations are happening at once, such as deleting/posting multiple posts at a time.
 * Also, some jank happens when revisiting the page after some time, usually after post deletion and/or reboot of server.
 * 
 * Written by Connor MacNeil (A00445228), some code is modified from code made by Devin Robar (A00446150)
 */

const express = require("express"); // call express application
const mysql = require("mysql2"); // call mysql application
const app = express(); // define top level function
const port = 3111;

//Variable for storing data obtained from database
var posts = {};

// Connecting to the database
let database = mysql.createConnection({
host: "127.0.0.1",
user: "group24D",
password: "venusSPECIALstart605",  
database: "group24D",
connectTimeout: 10000,
});
database.connect();

/**
 * When the server starts, request the posts and put them in the posts var
 */
function updateServer() {
  // Updating Posts
  database.query(
    "SELECT * FROM Posts;", //Gets all data from the Posts table
    function (err, res) {
      if (err) throw err;
      else {
        for (let i = 0; i < res.length; i++) { //Iterates over each record in the res array. Each record corresponds to a row in the Posts table
          if (res[i] != undefined) { //As long as the current iteration isn't empty in the res array (no corresponding post in the Posts table), continue
            if (!posts[res[i].id]) { // If there is no post, create an empty post in its place.
              posts[res[i].id] = {};
            }
            posts[res[i].id]["post"] = res[i].post; //Updates posts variable above with the content of the current entry in the SQL table
          };
        };
      };
    }
  );
};
updateServer() //Runs the above function on startup
// These are the commands that are used to make the tables that will be used
// CREATE TABLE Posts(
//    id INT PRIMARY KEY,
//    post TEXT,
// );

app.use(express.json()); // implement JSON recognition
app.use(express.urlencoded({ extended: true })); // implement incoming name:value pairs to be any type

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // allow any origin
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // allow any method
  res.header("Access-Control-Allow-Headers", "Content-Type"); // accept only headers with this type
  next(); // middleware callback function required for processing
};
app.use(allowCrossDomain); // implement allowable domain characteristics

/**
 * For setting input boxes at page load
 */
app.get("/receive", function (req, res) { // Declared function which receives the HTTP get request sent from blog.js ($.get(SERVER_URL + "/receive", receive).fail(errorCallback1);) in this case), executes the function declared here on the server side
  updateServer(); 
  console.log(req.url); // Logs the URL of the incoming HTTP get request
  return res.status(200).send(posts); // Sends a response back to the client with a status code of 200 which means OK, with the body as the posts objects
  });

/**
 * Handles send requests from the client side.
 */
app.post("/send", function (req, res) { // Receives POST requests to the /send endpoint.
    console.log("Id #" + req.body.id); // Logs the JSON object parameters from the incoming object
    posts[req.body.id] = {
      "post":req.body.post
    };
    let queryRowAdd = 'INSERT INTO `Posts` (id, post) VALUES (?, ?) ON DUPLICATE KEY UPDATE post = VALUES(post)'; // Updates the post properties of the post (incoming object)
    database.query(queryRowAdd, [req.body.id, req.body.post], function(err) { // Queries the database with the sent data from client side, checks for errors below
      if (err) {
        console.log(req.body.id); // If error, log ID
      } else {
        updateServer(); // If no error, update the server with latest data from database
      }
    })
});

/**
 * Deletes a post from the server and database
 */
app.post("/delete", function (req, res) {
  posts[req.body.id]["post"] = ""; // Sets the specified existing post in the posts object to an empty object, thereby deleting it
  let queryRowDelete = 'DELETE FROM Posts WHERE id=?'; // Deletes the specified post from the database
  database.query(queryRowDelete, [req.body.id], function(err) { // Queries database to run the above query, if error, log ID, otherwise log "Good!" to the console
    if (err) {
      console.log(req.body.id);
    } else {
      console.log("Good!");
    }
  })
});

/**
 * Runs when the signal is terminated, closes the database and server connections
 */
process.on("SIGTERM", function () {
  console.log("Shutting server down.");
  database.close();
  app.close();
});

/**
 * Makes this program run on the port that was set at the top of the script
 */
app.listen(port, function () {
    console.log("Running on port: " + port);
});
