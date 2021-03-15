const editUser = document.querySelectorAll('.edit')
const user = document.querySelectorAll('.user')

editUser.forEach((element) => {
    element.addEventListener('click', function (event) {
        let button = event.currentTarget
        let li = button.parentElement
        let section = li.parentElement
        let user = section.parentElement
        let form = user.querySelector('.editForm')

        section.style.display = 'none'

        form.style.display = 'flex'
    })
})
