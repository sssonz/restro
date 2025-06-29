document.addEventListener('DOMContentLoaded', () => {
  const circles = document.querySelectorAll('[class^="circle_"]');
  const imgMain = document.querySelector('.img_main');
  const divMain = document.querySelector('.div_img_main');

  const originalBackgroundSize = '100%';
  imgMain.style.transition = 'transform 0.3s ease-out';

  const isMobileOrTablet = window.innerWidth <= 768;

  circles.forEach(circle => {
    const imgCircleBl = circle.querySelector('.img_circle_bl');
    const divCircleBl = circle.querySelector('.div_cirkle_bl');
    const imgCircle = circle.querySelector('.img_circle');

    if (isMobileOrTablet) {
      // На мобилках и планшетах сразу показываем блоки и не увеличиваем фон
      if (imgCircleBl) imgCircleBl.style.display = 'flex';
      if (divCircleBl) divCircleBl.style.display = 'flex';
      // Не навешиваем обработчики mouseenter/mouseleave, чтобы фон не увеличивался
      return;
    }

    circle.addEventListener('mouseenter', () => {
      if (imgCircleBl) imgCircleBl.style.display = 'flex';
      if (divCircleBl) divCircleBl.style.display = 'flex';

      const rect = imgCircle.getBoundingClientRect();
      const mainRect = divMain.getBoundingClientRect();

      const circleCenterX = rect.left + rect.width / 2 - mainRect.left;
      const circleCenterY = rect.top + rect.height / 2 - mainRect.top;

      // Увеличиваем и перемещаем фон
      const scaleFactor = 1.1;
      const translateX = (mainRect.width / 2 - circleCenterX) * (scaleFactor - 1.1);
      const translateY = (mainRect.height / 2 - circleCenterY) * (scaleFactor - 1.1);

      imgMain.style.transformOrigin = `${circleCenterX}px ${circleCenterY}px`;
      imgMain.style.transform = `scale(${scaleFactor}) translate(${translateX}px, ${translateY}px)`;
    });

    circle.addEventListener('mouseleave', () => {
      if (imgCircleBl) imgCircleBl.style.display = 'none';
      if (divCircleBl) divCircleBl.style.display = 'none';

      imgMain.style.transformOrigin = 'center center';
      imgMain.style.transform = 'scale(1)';
    });
  });
});
