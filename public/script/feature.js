let preferenceMenu = document.querySelector('main div:first-of-type');
let preferenceButton = document.querySelector('main section:first-of-type button');
let preferenceImage = document.querySelector('main section:first-of-type button img');

const showPreferences = () => {
    preferenceMenu.classList.toggle('showPreferences');
};

preferenceButton.addEventListener('click', showPreferences);

