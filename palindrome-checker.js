document.getElementById("check-btn").addEventListener("click", () => {
  const textInput = document.getElementById("text-input").value;
  const resultElement = document.getElementById("result");

  if (!textInput) {
    alert("Please input a value");
    return;
  }

  // Normalize the input by removing non-alphanumeric characters and converting to lowercase
  const normalizedInput = textInput.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const reversedInput = normalizedInput.split('').reverse().join('');

  // Check if the normalized input is equal to its reverse
  const isPalindrome = normalizedInput === reversedInput;

  // Set the result message
  resultElement.textContent = `${textInput} ${isPalindrome ? 'is' : 'is not'} a palindrome`;
});
