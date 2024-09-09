// Roman numeral conversion logic
const romanNumerals = [
  { value: 1000, numeral: 'M' },
  { value: 900, numeral: 'CM' },
  { value: 500, numeral: 'D' },
  { value: 400, numeral: 'CD' },
  { value: 100, numeral: 'C' },
  { value: 90, numeral: 'XC' },
  { value: 50, numeral: 'L' },
  { value: 40, numeral: 'XL' },
  { value: 10, numeral: 'X' },
  { value: 9, numeral: 'IX' },
  { value: 5, numeral: 'V' },
  { value: 4, numeral: 'IV' },
  { value: 1, numeral: 'I' }
];

// Convert function
function convertToRoman(num) {
  let roman = '';
  for (let i = 0; i < romanNumerals.length; i++) {
    while (num >= romanNumerals[i].value) {
      roman += romanNumerals[i].numeral;
      num -= romanNumerals[i].value;
    }
  }
  return roman;
}

// Event listener for the convert button
document.getElementById('convert-btn').addEventListener('click', () => {
  const inputVal = document.getElementById('number').value;
  const output = document.getElementById('output');

  // Validate the input
  if (inputVal === '') {
    output.textContent = 'Please enter a valid number';
  } else if (inputVal < 1) {
    output.textContent = 'Please enter a number greater than or equal to 1';
  } else if (inputVal >= 4000) {
    output.textContent = 'Please enter a number less than or equal to 3999';
  } else {
    output.textContent = convertToRoman(inputVal);
  }
});
