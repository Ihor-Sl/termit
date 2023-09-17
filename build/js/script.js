const menu = document.querySelector('.nav__links')
const burger = document.querySelector('.nav__burger')

if (menu && burger) {
    burger.addEventListener('click', () => {
        menu.classList.toggle('active')
        burger.classList.toggle('active')
        document.body.classList.toggle('lock')
    })

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active')
            burger.classList.remove('active')
            document.body.classList.remove('lock')
        })
    })
}

const anchors = document.querySelectorAll('a[href*="#"]')

anchors.forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault()
        const element = document.getElementById(anchor.getAttribute('href').substring(1))
        window.scrollTo({
            top: element.getBoundingClientRect().top + window.pageYOffset - 110,
            behavior: "smooth"
        })
    })
});
const modulesBtns = document.querySelectorAll('.modules__grid__item')
const displayItems = document.querySelectorAll('.modules__grid__display__item')
modulesBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        modulesBtns.forEach(el => el.classList.remove('active'))
        btn.classList.toggle('active')
        displayItems.forEach(el => el.classList.remove('active'))
        document.getElementById(btn.id + "-D").classList.toggle('active')
    })
});
new Splide('.splide', {
    fixedWidth: 380,
    gap: 30
}).mount();