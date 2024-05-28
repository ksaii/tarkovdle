document.addEventListener('DOMContentLoaded', () => {
    // Fetch weapon names from the backend
    fetch('http://localhost:3000/api/weapon-names')
    .then(response => response.json())
    .then(data => {
      weaponNames = data;
      populateDropdown();
    })
    .catch(error => console.error('Error fetching weapon names:', error));

  const guessInput = document.getElementById('guessInput');
  const dropdown = document.getElementById('dropdown-content');

  // Show dropdown on input focus
  guessInput.addEventListener('focus', () => {
    populateDropdown();
    dropdown.style.display = 'block';
  });

  // Hide dropdown on input blur
  guessInput.addEventListener('blur', () => {
    setTimeout(() => {
      dropdown.style.display = 'none';
    }, 15); // Delay to allow click event on dropdown options
  });

  // Populate dropdown with matching options
  guessInput.addEventListener('input', () => {
    populateDropdown();
  });

  // Populate dropdown function
  function populateDropdown() {
    const value = guessInput.value.toLowerCase();
    dropdown.innerHTML = '';
    weaponNames.forEach(name => {
      if (name.toLowerCase().startsWith(value)) {
        const option = document.createElement('div');
        option.textContent = name;
        option.addEventListener('click', () => {
          guessInput.value = name;
          dropdown.style.display = 'none';
        });
        dropdown.appendChild(option);
      }
    });
  }

  // Fetch hints from the backend for the daily weapon
  fetch('http://localhost:3000/api/daily-weapon')
    .then(response => response.json())
    .then(data => {
      const hintsDiv = document.getElementById('hints');
      hintsDiv.innerHTML = `
        <p>Ammo Types: ${data.ammo_type}</p>
        <p>Price Range: ${data.price_range}</p>
        <p>Barter Level: ${data.barter_level}</p>
        <p>Type: ${data.type}</p>
      `;
    })
    .catch(error => console.error('Error fetching daily weapon:', error));

  // Handle guess submission
  document.getElementById('submitGuess').addEventListener('click', () => {
    const userGuess = guessInput.value;
    fetch(`http://localhost:3000/api/validate-guess?guess=${userGuess}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('result').innerText = data.message;
      })
      .catch(error => console.error('Error validating guess:', error));
  });
});
