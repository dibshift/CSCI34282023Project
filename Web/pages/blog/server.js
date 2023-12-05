const express = require("express"); // call express application
const mysql = require("mysql2"); // call mysql application
const app = express(); // define top level function
const port = 3111;

var posts = {
    '1':{
       "post":"",
    },
    '2':{
       "post":"",
    },
    '3':{
       "post":"",
    },
    '4':{
      "post":"",
   },
   '5':{
      "post":"",
   }
 };

// Connecting to the database
let database = mysql.createConnection({
host: "127.0.0.1",
user: "group24D",
password: "venusSPECIALstart605",  
database: "group24D",
connectTimeout: 10000,
});
database.connect();

//When the server starts, request the posts and put them in the posts var
// both to avoid changing some code and to make it somewhat more secure
function updateServer() {
  // Updating Posts
  database.query(
    "SELECT * FROM Posts;", //Gets all data from the Posts table
    function (err, res) {
      if (err) throw err;
      else {
        for (let i = 0; i < res.length; i++) { //Iterates over each record in the res array. Each record corresponds to a row in the Posts table
          if (res[i] != undefined) { //As long as the current iteration isn't empty in the res array (no corresponding post in the Posts table), continue
            if (!posts[res[i].id]) {
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

// setting input boxes at page load
app.get("/receive", function (req, res) { // Declared function which receives the HTTP get request sent from blog.js ($.get(SERVER_URL + "/receive", receive).fail(errorCallback1);) in this case), executes the function declared here on the server side
  updateServer(); 
  console.log(req.url); // Logs the URL of the incoming HTTP get request
  return res.status(200).send(posts); // Sends a response back to the client with a status code of 200 which means OK, with the body as the posts objects
  });

// template of receiving:
// {
//     "id":"",
//     "name":"",
//     "post":""
//  }
app.post("/send", function (req, res) { // Receives POST requests to the /send endpoint.
    console.log("Id #" + req.body.id); // Logs the JSON object parameters from the incoming object
    if (req.body.id > Object.keys(posts).length) {
      console.log("EXCEEDS LENGTH");
      posts[req.body.id] = {
        "post":req.body.post
      };
      let queryRowAdd = 'INSERT INTO `Posts` VALUES (?, ?)';
      database.query(queryRowAdd, [req.body.id, req.body.post], function(err) {
        if (err) {
          console.log(req.body.id);
        } else {
          updateServer();
        }
      })
    } else {
      console.log("GOOD LENGTH");
    }
    // Updates the post properties of the post (incoming object)
    posts[req.body.id]["post"] = req.body.post;
    // Updating the SQL Server
    let queryFull = 'INSERT INTO `Posts` VALUES () UPDATE `Posts` SET post = ? WHERE id=?';
    database.query(queryFull, [req.body.post, req.body.id], function(err) { // Updates the database with the new post
      if(err) {
        console.log(req.body.id);//err.message); // If there is an error, log the error message
      } else {
        updateServer(); // Else, run this above defined function to update the server (posts) with the latest from the database, including the new post
      }
    });
});

process.on("SIGTERM", function () {
  console.log("Shutting server down.");
  database.close();
  app.close();
});

// makes this program run on the port that was set at the top of the script
app.listen(port, function () {
    console.log("Running on port: " + port);
});
