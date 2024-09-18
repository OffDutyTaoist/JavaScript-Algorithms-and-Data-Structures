// Function to validate phone numbers
function validatePhoneNumber(phoneNumber) {
    const validPatterns = [
        /^1 \d{3}-\d{3}-\d{4}$/,         // 1 555-555-5555
        /^1 \(\d{3}\) \d{3}-\d{4}$/,    // 1 (555) 555-5555
        /^\d{10}$/,                     // 5555555555
        /^\d{3}-\d{3}-\d{4}$/,          // 555-555-5555
        /^\(\d{3}\)\d{3}-\d{4}$/,       // (555)555-5555
        /^1\(\d{3}\)\d{3}-\d{4}$/,      // 1(555)555-5555
        /^1 \d{3} \d{3} \d{4}$/         // 1 555 555 5555
    ];

    // Check if phone number matches any of the valid patterns
    for (let pattern of validPatterns) {
        if (pattern.test(phoneNumber)) {
            return true;
        }
    }
    return false;
}

// Function to display results
function displayResult(message) {
    document.getElementById('results-div').textContent = message;
}

// Event listener for check button
document.getElementById('check-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value.trim();
    
    if (!userInput) {
        alert('Please provide a phone number');
        return;
    }

    const isValid = validatePhoneNumber(userInput);
    if (isValid) {
        displayResult(`Valid US number: ${userInput}`);
    } else {
        displayResult(`Invalid US number: ${userInput}`);
    }
});

// Event listener for clear button
document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('user-input').value = '';
    document.getElementById('results-div').textContent = '';
});
