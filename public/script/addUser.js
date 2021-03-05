const newUser = document.querySelector('#newUser button');
const userForm = document.querySelector('#addUser');

newUser.addEventListener('click', function() {
    userForm.classList.toggle('showForm');

    if (newUser.textContent === '+') {
        newUser.textContent = 'x';
    } else {
        newUser.textContent = '+';
    };

});