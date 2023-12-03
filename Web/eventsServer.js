//require express, body parser, and path
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Store events in memory 
let storedEvents = [];

// Define a route for handling HTTP POST requests to '/postEvent'
app.post('/postEvent', (req, res) => {
  try {
    // Extract the JSON data from the request body
    const receivedData = req.body; // This will contain the parsed JSON data

    // Log the received event data to the console
    console.log('Received event data:', receivedData);

    // Store the received data in an array (assuming 'storedEvents' is defined elsewhere)
    storedEvents.push(receivedData);

    // Respond to the client with a success status and JSON object
    res.status(200).json({ success: true });
  } catch (error) {
    // Handle any errors that may occur during JSON parsing or data processing
    console.error('Error parsing JSON:', error);

    // Respond to the client with an error status and JSON object
    res.status(500).json({ success: false, error: 'Error parsing JSON' });
  }
});

// Define a route for handling HTTP GET requests to '/getEvents'
app.get('/getEvents', (req, res) => {

  // Respond to the client with the stored events in a JSON object
  res.json({ events: storedEvents });
});


// Serve static files (HTML, CSS, and JS) from the 'public' directory
// Serve static files (HTML, CSS, and JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'pages', 'events')));
app.use(express.static(path.join(__dirname, 'pages', 'styles')));



//serve files on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));