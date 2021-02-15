const preferenceButton = document.querySelector('main section:first-of-type button');
const preferenceMenu = document.querySelector('main div:first-of-type');

const showPreference = () => {
    preferenceMenu.classList.toggle('showPreference');
};

preferenceButton.addEventListener('click', showPreference);