// Store the ID of the currently selected candidate
let selectedCandidateId = null;

// Load candidates and create cards dynamically
async function loadCandidates() {
    try {
        const response = await fetch('/candidates'); // or `/api/candidates` if using that route
        const candidates = await response.json();
        const container = document.getElementById('candidates-container');
        container.innerHTML = '';

        candidates.forEach(candidate => {
            const card = document.createElement('div');
            card.className = 'candidate-card';

            card.innerHTML = `
                <div class="candidate-info">
                    <h2>${candidate.name}</h2>
                    <p>Candidate Id: ${candidate.candidateId}</p>
                    <p>Age: ${candidate.age}</p>
                    <p>Party: ${candidate.party}</p>
                    <p>Qualification: ${candidate.qualification}</p>
                </div>
                <div class="toggle-button" onclick="selectCandidate(${candidate.candidateId}, this)">
                    <div class="toggle-circle"></div>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading candidates:', error);
    }
}

// Function to handle candidate selection
function selectCandidate(candidateId, toggleElement) {
    // Deselect the previously selected toggle button
    if (selectedCandidateId !== null) {
        const previousToggle = document.querySelector(`.toggle-button.active`);
        if (previousToggle) previousToggle.classList.remove('active');
    }

    // Set the current selection
    selectedCandidateId = candidateId;
    toggleElement.classList.add('active'); // Activate the clicked toggle button

    // Enable the submit button
    document.getElementById('submit-btn').disabled = false;
}

// Handle vote submission
async function submission() {
    if (selectedCandidateId === null) {
        alert("Please select a candidate before submitting.");
        return;
    }
    // alert(`Vote submitted for candidate ID: ${selectedCandidateId}`);

    // creating post equest for updating vote count 
    try{
        const response = await fetch ('/candidates/castVote',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',

            },
            body: JSON.stringify({candidateId: selectedCandidateId}),
        });
        const result = await response.json();
        if(response.ok){
            console.log(result.message);
        }
        else{
            console.error(result.message);
        }
    }catch(error){
        console.log('Error:' ,error);
    }

    //
    document.body.innerHTML = '';
    const textarea = document.createElement('p');
    textarea.innerText = `Vote submitted for candidate ID: ${selectedCandidateId}`;
    document.body.appendChild(textarea);
    const btn = document.createElement('button');
    btn.className = 'btn-align'
    btn.textContent = 'voting results';

    btn.onclick = () => {
        // add the link to new html page where i will show the voting results 
        window.location.href = 'voting-result.html'; // Replace with the actual HTML page path
    }

    document.body.appendChild(btn);

    // Add any further logic for submitting the vote
}

// Load candidates when the page loads
window.addEventListener('load', loadCandidates);
