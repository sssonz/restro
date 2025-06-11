document.addEventListener('DOMContentLoaded', () => {
  const circles = document.querySelectorAll('[class^="circle_"]');
  const imgMain = document.querySelector('.img_main');
  const divMain = document.querySelector('.div_main');

  const originalBackgroundSize = '100%';
  imgMain.style.transition = 'transform 0.3s ease-out';

  circles.forEach(circle => {
    const imgCircleBl = circle.querySelector('.img_circle_bl');
    const divCircleBl = circle.querySelector('.div_cirkle_bl');
    const imgCircle = circle.querySelector('.img_circle'); // Добавляем выбор элемента .img_circle

    circle.addEventListener('mouseenter', () => {
      if (imgCircleBl && divCircleBl && imgCircle) { // Проверяем наличие imgCircle
        imgCircleBl.style.display = 'block';
        divCircleBl.style.display = 'block';
        imgCircle.style.display = 'none'; // Скрываем основной круг

        // Получаем координаты круга относительно .div_main
        const rect = circle.getBoundingClientRect();
        const mainRect = divMain.getBoundingClientRect();

        const circleCenterX = rect.left + rect.width / 2 - mainRect.left;
        const circleCenterY = rect.top + rect.height / 2 - mainRect.top;

        // Увеличиваем и перемещаем фон
        const scaleFactor = 1.1;
        const translateX = (mainRect.width / 2 - circleCenterX) * (scaleFactor - 1);
        const translateY = (mainRect.height / 2 - circleCenterY) * (scaleFactor - 1);

        imgMain.style.transformOrigin = `${circleCenterX}px ${circleCenterY}px`;
        imgMain.style.transform = `scale(${scaleFactor}) translate(${translateX}px, ${translateY}px)`;
      }
    });

    circle.addEventListener('mouseleave', () => {
      if (imgCircleBl && divCircleBl && imgCircle) { // Проверяем наличие imgCircle
        imgCircleBl.style.display = 'none';
        divCircleBl.style.display = 'none';
        imgCircle.style.display = 'block'; // Показываем основной круг

        // Возвращаем исходные значения
        imgMain.style.transformOrigin = 'center center';
        imgMain.style.transform = 'scale(1)';
      }
    });
  });
});

