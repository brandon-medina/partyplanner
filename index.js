document.getElementById('add-party-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  const newEvent = {
    name: document.getElementById('name').value,
    date: `${date}T${time}:00Z`, // Correct ISO 8601 format
    location: document.getElementById('location').value,
    description: document.getElementById('description').value
  };
  
  const apiUrl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF-B/events';
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent) // Corrected stringification
    });
    
    if (response.ok) {
      // Optionally, fetch all events again to update the list including the new event
      fetchAllEvents();
    } else {
      const errorDetails = await response.json(); // Properly catching errors
      console.error('Error details:', errorDetails);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('There was an error submitting the new event:', error);
  }
});

async function fetchAllEvents() {
  const apiUrl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF-B/events';
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    
      // Select the event container
      const eventContainer = document.getElementById('event-container');
      eventContainer.innerHTML = ''; // Clears previous events
      // Iterate through the events and create elements for each
      result.data.forEach(data => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event-container');
        // Parsing the date for displaying in readable format
        const eventDate = new Date(data.date);
        const formattedDate = eventDate.toLocaleDateString();
        const formattedTime = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        eventElement.innerHTML = `
          <div class="event-card">
            <h3>${data.name}</h3>
            <p>Date: ${formattedDate}</p>
            <p>Time: ${formattedTime}</p>
            <p>Location: ${data.location}</p>
            <p>Description: ${data.description}</p>
            <div class="delete-btn-container">
              <button class="delete-btn" data-event-id="${data.id}">Delete</button>
            </div>
          </div>
          `;
        eventContainer.appendChild(eventElement);
    });
    attachDeleteEventHandlers();
  } catch (error) {
    console.error('There was an error fetching the events:', error);
  }
}
fetchAllEvents();

function attachDeleteEventHandlers() {
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const eventId = e.target.getAttribute('data-event-id');
      deleteEvent(eventId);
    });
  });
}

async function deleteEvent(eventId) {
  const apiUrl = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF-B/events/${eventId}`;
  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Successfully deleted the event
    fetchAllEvents(); // Refresh events list
  } catch (error) {
    console.error('There was an error deleting the event:', error);
  }
}