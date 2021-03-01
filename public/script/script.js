let preferenceMenu = document.querySelector('main div:first-of-type');
let preferenceButton = document.querySelector('main section:first-of-type button');
let preferenceImage = document.querySelector('main section:first-of-type button img');
let gameArray = [];
const addButton = document.querySelector('.addButton');
const gameUl = document.querySelector('.gameArray');
const errorMessage = document.querySelector('.errorMessage');

const showPreferences = () => {
    preferenceMenu.classList.toggle('showPreferences');
};

const addGame = () => {
    let inputValue = document.getElementById('games').value;

    if (inputValue === '') {
        errorMessage.textContent = 'Please type in a game';
    } else {
        gameArray.push(inputValue);
        errorMessage.textContent = '';
        document.getElementById('games').value = '';
    };

    gameUl.textContent = '';

    for (let i = 0; i < gameArray.length; i++) {
        
        let li = document.createElement('li');
        let button = document.createElement('h4');
        button.className = 'close';
        li.textContent = gameArray[i];
        button.textContent = '-';
        gameUl.appendChild(li);
        li.appendChild(button);
        
    };

    console.log(gameArray);

};


preferenceButton.addEventListener('click', showPreferences);
addButton.addEventListener('click', addGame);



