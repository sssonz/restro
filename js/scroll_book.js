document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const img1 = document.querySelector('.img_book_1');
  const img2 = document.querySelector('.img_book_2');
  const img3 = document.querySelector('.img_book_3');
  const img4 = document.querySelector('.img_book_4');
  const img5 = document.querySelector('.img_book_5');
  const img6 = document.querySelector('.img_book_6');
  const scr_but = document.querySelector('.scroll');

  let scrollPos = 0;
  const maxScroll = 1300; // Подстройте под ваш контент
  const step = maxScroll / 8;

  // Функции показа/скрытия
  function show(img) { img.style.opacity = '1'; }
  function hide(img) { img.style.opacity = '0'; }

  // Обновление видимости картинок в зависимости от scrollPos
  function updateImages() {
    if (scrollPos < step) {
      hide(img1); hide(img2); hide(img3); hide(img4); hide(img5); hide(img6);
    } else if (scrollPos < step * 2) {
      show(img1); hide(img2); hide(img3); hide(img4); hide(img5); hide(img6);
      if (scr_but) scr_but.style.display = 'none';
    } else if (scrollPos < step * 3) {
      show(img1); show(img2); hide(img3); hide(img4); hide(img5); hide(img6);
    } else if (scrollPos < step * 4) {
      show(img1); show(img2); show(img3); hide(img4); hide(img5); hide(img6);
    } else if (scrollPos < step * 5) {
      show(img1); show(img2); show(img3); show(img4); hide(img5); hide(img6);
    } else if (scrollPos < step * 6) {
      show(img1); show(img2); show(img3); show(img4); show(img5); hide(img6);
    } else {
      show(img1); show(img2); show(img3); show(img4); show(img5); show(img6);
    }
  }

  // Обработка колёсика мыши
  container.addEventListener('wheel', (event) => {
    event.preventDefault();
    scrollPos += event.deltaY;
    scrollPos = Math.min(Math.max(scrollPos, 0), maxScroll);
    updateImages();
  }, { passive: false });

  // Для поддержки тач-скролла
  let touchStartY = null;

  container.addEventListener('touchstart', (event) => {
    if (event.touches.length === 1) {
      touchStartY = event.touches[0].clientY;
    }
  }, { passive: true });

  container.addEventListener('touchmove', (event) => {
    if (!touchStartY) return;

    const touchCurrentY = event.touches[0].clientY;
    const deltaY = touchStartY - touchCurrentY; // положительное при движении вверх (скролл вниз)

    scrollPos += deltaY;
    scrollPos = Math.min(Math.max(scrollPos, 0), maxScroll);

    updateImages();

    touchStartY = touchCurrentY;

    event.preventDefault(); // предотвращаем дефолтный скролл страницы
  }, { passive: false });

  container.addEventListener('touchend', () => {
    touchStartY = null;
  });
});
