let validPokemonList = [];

// Fetch the list of all valid Pokémon names and IDs when the page loads
fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon')
    .then(response => response.json())
    .then(data => {
        validPokemonList = data.results.map(pokemon => ({
            name: pokemon.name,
            url: pokemon.url
        }));
    })
    .catch(error => {
        console.error("Error fetching Pokémon list:", error);
    });

// Handle the search button click
document.getElementById('search-button').addEventListener('click', () => {
    let searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    
    // Normalize the input (lowercase, replace spaces with dashes, remove special characters)
    searchInput = normalizeInput(searchInput);

    // Validate the input against the valid Pokémon list
    if (!isValidPokemon(searchInput)) {
        alert("Pokémon not found");
        clearPokemonInfo();
        return;
    }

    const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            return response.json();
        })
        .then(data => {
            updatePokemonInfo(data);
        })
        .catch(error => {
            alert("Pokémon not found");
            clearPokemonInfo();
        });
});

// Normalize input by removing special characters and spaces, and using dashes
function normalizeInput(input) {
    // Handle special cases for gendered Pokémon (e.g., "nidoran♀" => "nidoran-f")
    input = input.replace("♀", "-f").replace("♂", "-m");
    // Remove any remaining special characters and replace spaces with dashes
    return input.replace(/[^a-z0-9-]/g, "").replace(/\s+/g, "-");
}

// Check if the input is a valid Pokémon name or ID
function isValidPokemon(input) {
    return validPokemonList.some(pokemon => pokemon.name === input || pokemon.url.endsWith(`/${input}/`));
}

// Update the Pokémon information on the page
function updatePokemonInfo(data) {
    // Display Pokémon data without extra labels
    document.getElementById('pokemon-name').textContent = data.name.toUpperCase();  // PIKACHU or GENGAR
    document.getElementById('pokemon-id').textContent = `#${data.id}`;  // #25 or #94
    document.getElementById('weight').textContent = data.weight;  // 60 or 405
    document.getElementById('height').textContent = data.height;  // 4 or 15
    document.getElementById('hp').textContent = data.stats[0].base_stat;  // 35 or 60
    document.getElementById('attack').textContent = data.stats[1].base_stat;  // 55 or 65
    document.getElementById('defense').textContent = data.stats[2].base_stat;  // 40 or 60
    document.getElementById('special-attack').textContent = data.stats[3].base_stat;  // 50 or 130
    document.getElementById('special-defense').textContent = data.stats[4].base_stat;  // 50 or 75
    document.getElementById('speed').textContent = data.stats[5].base_stat;  // 90 or 110

    // Handle Pokémon types
    const typesContainer = document.getElementById('types');
    typesContainer.innerHTML = ''; // Clear previous types
    data.types.forEach(typeInfo => {
        const typeElement = document.createElement('span');
        typeElement.textContent = typeInfo.type.name.toUpperCase();  // ELECTRIC, GHOST, POISON, etc.
        typesContainer.appendChild(typeElement);
    });

    // Update Pokémon sprite image
    const spriteContainer = document.getElementById('sprite-container');
    spriteContainer.innerHTML = ''; // Clear previous sprite
    const img = document.createElement('img');
    img.src = data.sprites.front_default;
    img.id = 'sprite';
    spriteContainer.appendChild(img);
}

// Clear all the Pokémon info from the page
function clearPokemonInfo() {
    document.getElementById('pokemon-name').textContent = '';
    document.getElementById('pokemon-id').textContent = '';
    document.getElementById('weight').textContent = '';
    document.getElementById('height').textContent = '';
    document.getElementById('hp').textContent = '';
    document.getElementById('attack').textContent = '';
    document.getElementById('defense').textContent = '';
    document.getElementById('special-attack').textContent = '';
    document.getElementById('special-defense').textContent = '';
    document.getElementById('speed').textContent = '';
    document.getElementById('types').innerHTML = '';
    document.getElementById('sprite-container').innerHTML = '';
}
