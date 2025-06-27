const cursor = document.getElementById('custom-cursor');

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
  const style = getComputedStyle(el);
  if (style.cursor === 'pointer') return true;
  return false;
}