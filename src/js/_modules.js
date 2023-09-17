const modulesBtns = document.querySelectorAll('.modules__grid__item')
const displayItems = document.querySelectorAll('.modules__grid__display__item')
modulesBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        modulesBtns.forEach(el => el.classList.remove('active'))
        btn.classList.toggle('active')
        displayItems.forEach(el => el.classList.remove('active'))
        document.getElementById(btn.id + "-D").classList.toggle('active')
    })
})