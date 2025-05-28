let scrollPosition = 0; // Начальная позиция прокрутки
const abImg = document.querySelector('.ab_img');
const abDiv = document.querySelector('.ab');
const stImg = document.querySelector('.st_img');
const stDiv = document.querySelector('.st');

document.addEventListener('wheel', (event) => {
    event.preventDefault(); // Отключаем стандартное поведение прокрутки
    scrollPosition += event.deltaY; // Изменяем позицию в зависимости от прокрутки мыши

    // Ограничиваем перемещение в пределах 0 и ширины контейнера
    scrollPosition = Math.max(-window.innerWidth / 2, Math.min(scrollPosition, window.innerWidth));

    // Перемещение блоков ab
    abImg.style.transform = `translateX(${-scrollPosition}px)`;
    abDiv.style.transform = `translateX(${scrollPosition}px)`; 

    // Перемещение блоков st после того, как ab блоки исчезнут
    if (scrollPosition >= window.innerWidth / 2) {
        // Перемещение блоков st

        stImg.style.transform = `translateX(${-scrollPosition}px)`;
        stDiv.style.transform = `translateX(${scrollPosition}px)`; 
    } else {
        // Сброс позиции st, если scrollPosition меньше ширины блока ab
        stImg.style.transform = `translateX(0)`;
        stDiv.style.transform = `translateX(0)`;
    }
});