// Function to handle the submission of form data entered by the administrator
function submitForm() {
  // Extract form input values and create an object with event data
  const eventData = {
    eventDate: document.getElementById('eventDate').value,
    eventTime: document.getElementById('eventTime').value,
    eventTitle: document.getElementById('eventTitle').value,
    eventDescription: document.getElementById('eventDescription').value,
  };
  
// Use the fetch API to send a POST request to the server endpoint 'http://localhost:3000/postEvent'
fetch('http://localhost:3000/postEvent', {
  // Specify the HTTP method as POST
  method: 'POST',
  // Set the request headers to indicate that the request body contains JSON data
  headers: {
    'Content-Type': 'application/json',
  },
  // Convert the eventData object to a JSON string and include it in the request body
  body: JSON.stringify(eventData),
})
// Handle the response from the server
.then(response => response.json())
// Log the success message along with the data received from the server
.then(data => console.log('Event data sent successfully:', data))
// Catch any errors that may occur during the fetch operation and log them
.catch(error => console.error('Error sending event data:', error));
}