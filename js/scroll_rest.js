document.addEventListener('DOMContentLoaded', () => {
  const bodyRest = document.querySelector('.body_rest');
  const morePh = document.querySelector('.more_ph');

  if (!bodyRest || !morePh) return;

  bodyRest.addEventListener('wheel', (e) => {
    const deltaY = e.deltaY;
    if (deltaY === 0) return;

    const scrollLeft = morePh.scrollLeft;
    const maxScrollLeft = morePh.scrollWidth - morePh.clientWidth;

    if (deltaY > 0 && scrollLeft < maxScrollLeft) {
      e.preventDefault();
      morePh.scrollLeft = Math.min(scrollLeft + deltaY, maxScrollLeft);
    }
    // Иначе — вертикальный скролл страницы работает по умолчанию
  }, { passive: false });
});