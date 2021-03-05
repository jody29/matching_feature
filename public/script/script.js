let preferenceMenu = document.querySelector('#matchPage main div:first-of-type');
let preferenceButton = document.querySelector('#matchPage main section:first-of-type button');

const showPreferences = () => {
    preferenceMenu.classList.toggle('showPreferences');
};

preferenceButton.addEventListener('click', showPreferences);




