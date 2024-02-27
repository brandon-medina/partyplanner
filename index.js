document.getElementById('add-party-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    console.log(`${date}T${time}Z`);

    const newEvent = {
      name: document.getElementById('name').value,
      date: `${date}T${time}Z`,
      location: document.getElementById('location').value,
      description: document.getElementById('description').value
    };
    
    const apiUrl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF-B/events';
    console.log(newEvent);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: newEvent
      });
      const newEventJson = await newEvent.json();
      
  
      
      if (!response.ok) {
        const errorDetails = await response.json(); // Requires try-catch block handling
        console.error('Error details:', errorDetails);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Optionally, fetch all events again to update the list including the new event
      fetchAllEvents();
      
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
      const result = await response.json(); // Renamed to 'result' for clarity
      console.log(result);
      
        // Select the event container
        const eventContainer = document.getElementById('event-container');
        eventContainer.innerHTML = ''; // Clear previous events
        // Iterate through the events and create elements for each
        result.data.forEach(data => {
          const eventElement = document.createElement('div');
          eventElement.classList.add('event-container');
          eventElement.innerHTML = `
            <h3>${data.name}</h3>
            <p>Date: ${data.date}</p>
            <p>Time: ${data.time}</p>
            <p>Location: ${data.location}</p>
            <p>Description: ${data.description}</p>
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
      // Successfully deleted event
      fetchAllEvents(); // Refresh events list
    } catch (error) {
      console.error('There was an error deleting the event:', error);
    }
  }