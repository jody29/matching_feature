let preferenceMenu = document.querySelector('main div:first-of-type');
let preferenceButton = document.querySelector('main section:first-of-type button');
let preferenceImage = document.querySelector('main section:first-of-type button img');
let gameArray = [];
const addButton = document.querySelector('.addButton');
const gameUl = document.querySelector('.gameArray');
const errorMessage = document.querySelector('form fieldset:nth-of-type(2) span');

const showPreferences = () => {
    preferenceMenu.classList.toggle('showPreferences');
};

const addGame = () => {
    let inputValue = document.getElementById('games').value;

    if (inputValue === '') {
        errorMessage.textContent = 'Please type in a game';
    } else {
        gameArray.push(inputValue);
    };

    for (let i = 0; i < gameArray.length; i++) {
        
        let li = document.createElement('li');
        li.textContent = gameArray[i];
        gameUl.appendChild(li);
        
    };
};

preferenceButton.addEventListener('click', showPreferences);
addButton.addEventListener('click', addGame);

