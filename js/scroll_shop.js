let scrollPosition = 0; // Начальная позиция прокрутки
const merchContainer = document.querySelector('.div_merch');

document.addEventListener('wheel', (event) => {
    event.preventDefault(); // Отключаем стандартное поведение прокрутки
    scrollPosition += event.deltaY;
    scrollPosition += event.deltaX;

    // Ограничиваем перемещение в пределах 0 и ширины контейнера
    scrollPosition = Math.max(0, Math.min(scrollPosition, merchContainer.scrollWidth - window.innerWidth));

    // Перемещение контейнера
    merchContainer.style.transform = `translateX(${scrollPosition}px)`;
});