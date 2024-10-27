async function loadVotingResults() {
    try {
        const response = await fetch('/candidates'); // Fetching candidate data from the API
        const candidates = await response.json();

        const container = document.getElementById('candidates-container');
        container.innerHTML = ''; // Clear any existing content

        candidates.forEach(candidate => {
            const card = document.createElement('div');
            card.className = 'candidate-card';
            card.innerHTML = `
                <h2>${candidate.name}</h2>
                <p>Age: ${candidate.age}</p>
                <p>Party: ${candidate.party}</p>
                <p>Qualification: ${candidate.qualification}</p>
                <p>Votes: ${candidate.voteCount || 0}</p> <!-- Display vote count -->
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching voting results:', error);
        const container = document.getElementById('candidates-container');
        container.innerHTML = '<p>Failed to load voting results.</p>'; // Display error message
    }
}

// Load voting results when the page loads
window.addEventListener('load', loadVotingResults);
