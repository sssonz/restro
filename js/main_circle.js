document.addEventListener('DOMContentLoaded', () => {
  const circles = document.querySelectorAll('[class^="circle_"]');
  const imgMain = document.querySelector('.img_main');
  const divMain = document.querySelector('.div_img_main');

  const originalBackgroundSize = '100%';
  imgMain.style.transition = 'transform 0.3s ease-out';

  circles.forEach(circle => {
    const imgCircleBl = circle.querySelector('.img_circle_bl');
    const divCircleBl = circle.querySelector('.div_cirkle_bl');
    const imgCircle = circle.querySelector('.img_circle');

    circle.addEventListener('mouseenter', () => {
        imgCircleBl.style.display = 'flex';
        divCircleBl.style.display = 'flex';

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
      })

      circle.addEventListener('mouseleave', () => {
        imgCircleBl.style.display = 'none';
        divCircleBl.style.display = 'none';

        imgMain.style.transformOrigin = 'center center';
        imgMain.style.transform = 'scale(1)';
      })
});
});