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