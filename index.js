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
    } catch (error) {
      console.error('There was an error fetching the events:', error);
    }
  }
  fetchAllEvents();

  document.getElementById('add-party-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const newEvent = {
      name: document.getElementById('name').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
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
        body: JSON.stringify(newEvent),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Optionally, fetch all events again to update the list including the new event
      fetchAllEvents();
      
    } catch (error) {
      console.error('There was an error submitting the new event:', error);
    }
  });