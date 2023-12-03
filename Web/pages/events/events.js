
// Execute the following code when the DOM content has been fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Fetch events from the server by making a GET request to 'http://localhost:3000/getEvents'
  fetch('http://localhost:3000/getEvents')
    // Parse the JSON response from the server
    .then(response => response.json())
    // Handle the data received from the server
    .then(data => {
      // Check if the response contains an 'events' property and it has at least one event
      if (data.events && data.events.length > 0) {
        // Call the populateCarousel function to display the events in a carousel
        populateCarousel(data.events);
      }
    })
    // Catch and log any errors that may occur during the fetch operation
    .catch(error => console.error('Error fetching events:', error));
});

function populateCarousel(events) {
  const carouselInner = document.querySelector('#eventsCarousel .carousel-inner');
  // Take only the next three events
  const upcomingEvents = events.slice(0, 3);

  upcomingEvents.forEach(function (event, index) {
    const eventItem = document.createElement('div');
    eventItem.classList.add('carousel-item');
    if (index === 0) {
      eventItem.classList.add('active');
    }
    eventItem.innerHTML = `
      <div class='indivEvent'>
        <div class='eventDetails'>
          <h3>${event.eventTitle}</h3>
          <h4>Date: ${event.eventDate}</h4>
          <h4>Time: ${event.eventTime}</h4>
        </div>
        <div class='eventDescription'>
          <p id='description'>Description: ${event.eventDescription}</p>
        </div>
      </div>
    `;
    carouselInner.appendChild(eventItem);
  });
}