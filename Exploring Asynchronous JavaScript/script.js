// Task 2: Fetching Characters Using Fetch API

const publicKey = '29ef43671d735b0073b1fd7115c26d9a';
const privateKey = 'dd0826476ed255a6afffe20a0fb4706173f7dc4b';
const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

async function fetchCharacters() {
    const offset = Math.floor(Math.random() * 1500); // Random offset for different characters
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}&limit=100`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Fetched Characters:', data.data.results);
        return data.data.results;
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Task 3: Updating User Interface Dynamically

async function updateUI() {
    const characters = await fetchCharacters();
    const characterContainer = document.getElementById('characterContainer');
    characterContainer.innerHTML = ''; // Clear any existing content

    // Filter characters with images and descriptions
    const validCharacters = characters.filter(character => character.thumbnail && character.description);

    // Shuffle the array to randomize the order
    const shuffledCharacters = shuffleArray(validCharacters);

    // Randomly select a subset of characters to display
    const displayedCharacters = [];
    const numCharactersToDisplay = 10; // Number of characters to display

    while (displayedCharacters.length < numCharactersToDisplay && shuffledCharacters.length > 0) {
        displayedCharacters.push(shuffledCharacters.pop());
    }

    displayedCharacters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.className = 'character';

        const characterName = document.createElement('h2');
        characterName.textContent = character.name;

        const characterDescription = document.createElement('p');
        characterDescription.textContent = character.description;

        const characterImage = document.createElement('img');
        characterImage.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        characterImage.alt = character.name;

        characterDiv.appendChild(characterName);
        characterDiv.appendChild(characterDescription);
        characterDiv.appendChild(characterImage);

        characterContainer.appendChild(characterDiv);
    });
}

// Add event listener to the button
document.getElementById('fetchButton').addEventListener('click', function() {
    updateUI();
});
