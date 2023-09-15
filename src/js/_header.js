const menu = document.querySelector('.nav__links')
const burger = document.querySelector('.nav__burger')

if (menu && burger) {
    burger.addEventListener('click', () => {
        menu.classList.toggle('active')
        burger.classList.toggle('active')
        document.body.classList.toggle('lock')
    })
}