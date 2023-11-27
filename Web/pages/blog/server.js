const express = require("express"); // call express application
const mysql = require("mysql2"); // call mysql application
const app = express(); // define top level function
const port = 3111;

var posts = {
    '1':{
       "title":"",
       "post":"",
       "posted": false
    },
    '2':{
       "title":"",
       "post":"",
       "posted": false
    },
    '3':{
       "title":"",
       "post":"",
       "posted": false
    }
 };
var words = {};

// Connecting to the database (I'l put mine in for now)
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
    "SELECT * FROM Posts;",
    function (err, res) {
      if (err) throw err;
      else {
        for (let i = 0; i < res.length; i++) {
          if (res[i] != undefined) {
            posts[res[i].id]["title"] = res[i].title;
            posts[res[i].id]["post"] = res[i].post;
            if (res[i].isPosted == 1) {
              posts[res[i].id]["posted"] = true;
            } else {
              posts[res[i].id]["posted"] = false
            }
          };
        };
      };
    }
  );
};
updateServer()
// These are the commands that are used to make the tables that will be used
// CREATE TABLE Posts(
//    id INT PRIMARY KEY,
//    title VARCHAR(255),
//    post TEXT,
//    isPosted BOOLEAN NOT NULL
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
app.get("/receive", function (req, res) {
  updateServer();
  console.log(req.url);
  return res.status(200).send(posts);
  });

// template of receiving:
// {
//     "id":"",
//     "name":"",
//     "post":""
//  }
app.post("/send", function (req, res) {
    console.log("Id #" + req.body.id + ", Title: " + req.body.title + ", Post: " + req.body.post);
    let publish = posts[req.body.id]["posted"];
    console.log(publish);
    switch (publish) {
      case true:
         posts[req.body.id]["posted"] = false;
        // Updating the SQL Server
         let query = 'UPDATE `Posts` SET isPosted = 0 WHERE id=?';
         database.query(query, req.body.id, function(err) {
          if(err) {
            console.log(err.message);
          } else {
            updateServer();
          }
        });
        
         break;
      case false:
         posts[req.body.id]["title"] = req.body.title;
         posts[req.body.id]["post"] = req.body.post;
         posts[req.body.id]["posted"] = true;
         // Updating the SQL Server
         let queryFull = 'UPDATE `Posts` SET isPosted = 1, title = ?, post = ? WHERE id=?';
         database.query(queryFull, [req.body.title, req.body.post, req.body.id], function(err) {
          if(err) {
            console.log(err.message);
          } else {
            updateServer();
          }
        });
         break;
    }
});

app.get("/receiveword", function (req, res) {
  updateServer();
  console.log(req.url);
  return res.status(200).send(words);
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
