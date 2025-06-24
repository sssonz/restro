document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const img1 = document.querySelector('.img_book_1');
  const img2 = document.querySelector('.img_book_2');
  const img3 = document.querySelector('.img_book_3');
  const img4 = document.querySelector('.img_book_4');
  const img5 = document.querySelector('.img_book_5');
  const img6 = document.querySelector('.img_book_6');

  let scrollPos = 0;
  const maxScroll = 1300; // задаём максимальное значение скролла (регулируйте под высоту содержимого)

  // Функция для плавного показа
  function show(img) {
    img.style.opacity = '1';
  }
  // Функция для плавного скрытия
  function hide(img) {
    img.style.opacity = '0';
  }

  // Обработчик колёсика мыши
  container.addEventListener('wheel', (event) => {
    event.preventDefault();

    // Изменяем scrollPos с учётом направления колёсика
    scrollPos += event.deltaY;
    if (scrollPos < 0) scrollPos = 0;
    if (scrollPos > maxScroll) scrollPos = maxScroll;

    const step = maxScroll / 8;

    if (scrollPos < step) {
      hide(img1);
      hide(img2);
      hide(img3);
      hide(img4);
      hide(img5);
      hide(img6);
    } else if (scrollPos < step * 2) {
      show(img1);
      hide(img2);
      hide(img3);
      hide(img4);
      hide(img5);
      hide(img6);
      } else if (scrollPos < step * 3) {
      show(img1);
      show(img2);
      hide(img3);
      hide(img4);
      hide(img5);
      hide(img6);
      } else if (scrollPos < step * 4) {
      show(img1);
      show(img2);
      show(img3);
      hide(img4);
      hide(img5);
      hide(img6);
      } else if (scrollPos < step * 5) {
      show(img1);
      show(img2);
      show(img3);
      show(img4);
      hide(img5);
      hide(img6);
    } else if (scrollPos < step * 6) {
      show(img1);
      show(img2);
      show(img3);
      show(img4);
      show(img5);
      hide(img6);
    } else{
      show(img1);
      show(img2);
      show(img3);
      show(img4);
      show(img5);
      show(img6);
    }
  }, { passive: false });
});