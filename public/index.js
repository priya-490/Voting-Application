// function cast_vote(){
//     window.location.href = "cast-vote.html";
// }

function showVotingForm() {
    document.getElementById('voting-form').style.display = 'block';
}

async function submitUserDetails() {
    const name = document.getElementById('name').value;
    const aadhar = document.getElementById('aadhar').value;

    if (!name || !aadhar) {
        document.getElementById('form-message').innerText = "Please fill in all fields.";
        return;
    }

    try {
        const response = await fetch('/userInfo/check', { // Replace with your actual endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, aadhar }),
        });

        const result = await response.json();

        if (result.exists) {
            // If the user exists, show an error message
            document.getElementById('form-message').innerText = "User already exists. You cannot vote.";
        }
        else {
            // If the user does not exist, proceed to voting page
            await fetch('/userInfo', { // Add user to the database
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, aadhar }),
            });

            // Redirect to the voting page
            window.location.href = 'cast-vote.html'; // Replace with the actual voting page
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('form-message').innerText = "An error occurred. Please try again.";
    }
}
