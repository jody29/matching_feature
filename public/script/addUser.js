const newUser = document.querySelector('#newUser button')
const userForm = document.querySelector('#addUser')
const editUser = document.querySelectorAll('.edit')
const user = document.querySelectorAll('.user')

editUser.forEach((element) => {
    element.addEventListener('click', function (event) {
        let button = event.currentTarget
        let li = button.parentElement
        let section = li.parentElement
        let user = section.parentElement
        let form = user.querySelector('form')

        section.style.visibility = 'hidden'

        form.style.display = 'block'
    })
})

newUser.addEventListener('click', () => {
    userForm.classList.toggle('showForm')

    if (newUser.textContent === '+') {
        newUser.textContent = 'x'
    } else {
        newUser.textContent = '+'
    }
})
