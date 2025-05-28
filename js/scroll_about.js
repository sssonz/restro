let scrollPosition = 0;
const abImg = document.querySelector('.ab_img');
const abDiv = document.querySelector('.ab');
const stImg = document.querySelector('.st_img');
const stDiv = document.querySelector('.st');

const AB_MIN_SCROLL = 0; // Минимальная позиция (не уезжаем влево)
const AB_MAX_SCROLL = window.innerWidth * 0.8; // Максимум вправо (80% ширины экрана)

const ST_START_POSITION = window.innerWidth / 2; // Когда начинает двигаться st
const ST_MAX_OFFSET = window.innerWidth * 0.25; // Максимальное смещение st

document.addEventListener('wheel', (event) => {
    event.preventDefault();
    
    scrollPosition += event.deltaY * 0.5;
    scrollPosition = Math.max(AB_MIN_SCROLL, Math.min(scrollPosition, AB_MAX_SCROLL));

    abImg.style.transform = `translateX(${-scrollPosition}px)`; // Влево
    abDiv.style.transform = `translateX(${scrollPosition}px)`; // Вправо

    if (scrollPosition >= ST_START_POSITION) {
        // st начинает двигаться только после половины прокрутки ab
        const stOffset = Math.min(
            (scrollPosition - ST_START_POSITION) * 0.5, // Замедление
            ST_MAX_OFFSET // Не дальше 25% ширины экрана
        );
        stImg.style.transform = `translateX(${-stOffset}px)`;
        stDiv.style.transform = `translateX(${stOffset}px)`;
    } else {
        // Если ab ещё не доехал до середины — st на месте
        stImg.style.transform = `translateX(0)`;
        stDiv.style.transform = `translateX(0)`;
    }
}, { passive: false });