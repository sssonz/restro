const cursor = document.getElementById('custom-cursor');

  // Список классов кликабельных картинок
  const clickableClasses = new Set([
    'logo', 'img_circle', 'img_circle_bl', 'h5_med_404', 'more-close', 'soc', 'modal-close', 'modal-close_bl',
    'mod-close', 'mod-close_bl', 'send-close', 'send-close_bl', 'mer'
  ]);

  window.addEventListener('mousemove', e => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';

    const el = document.elementFromPoint(e.clientX, e.clientY);

    if (isClickable(el)) {
      cursor.classList.add('cursor-hover');
    } else {
      cursor.classList.remove('cursor-hover');
    }
  });

  function isClickable(el) {
    if (!el) return false;
    const tag = el.tagName.toLowerCase();
    const clickableTags = ['a', 'button', 'input', 'select', 'textarea', 'label'];

    if (clickableTags.includes(tag)) return true;

    // Проверяем, есть ли у элемента один из кликабельных классов
    for (const cls of clickableClasses) {
      if (el.classList.contains(cls)) return true;
    }

    // Проверяем CSS cursor
    const style = getComputedStyle(el);
    if (style.cursor === 'pointer') return true;

    return false;
  }