async function fetchParties() {
    try {
        const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF-B');
        const parties = await response.json();

        const container = document.getElementById('parties-container');
        container.innerHTML = ''; // Clear the container

        parties.forEach(party => {
            const partyElement = document.createElement('div');
            partyElement.innerHTML = `
                <h3>${party.name}</h3>
                <p>Date: ${party.date}</p>
                <p>Time: ${party.time}</p>
                <p>Location: ${party.location}</p>
                <p>Description: ${party.description}</p>
                <button onclick="deleteParty('${party._id}')">Delete</button>
            `;
            container.appendChild(partyElement);
        });
    } catch (error) {
        console.error('There was an error fetching the parties: ', error);
    }
}

fetchParties(); // Call the function to populate the parties on load

async function deleteParty(partyId) {
    try {
        await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF-B/${partyId}`, {
            method: 'DELETE',
        });

        // Refresh the list of parties after deletion
        fetchParties();
    } catch (error) {
        console.error('There was an error deleting the party: ', error);
    }
};