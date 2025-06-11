let scrollPos = 0;
const evenContainer = document.querySelector('.div_even');
const closeButton = document.querySelector('.mod-close_bl');
const closeBut = document.querySelector('.send-close_bl');
const modOverlayBl = document.querySelector('.modal-overlay_bl');
const modSend = document.querySelector('.modal-send_bl');
const modWindow = document.querySelector('.modal-window_bl');

// Горизонтальный скролл по колесу мыши
document.addEventListener('wheel', (event) => {
  event.preventDefault();
  // Учитываем только вертикальную прокрутку для горизонтального движения
  scrollPos += event.deltaY;
  scrollPos -= event.deltaX;

  // Ограничиваем в пределах
  const maxScroll = evenContainer.scrollWidth - window.innerWidth;
  scrollPos = Math.max(0, Math.min(scrollPos, maxScroll));

  evenContainer.style.transform = `translateX(${scrollPos}px)`;
}, { passive: false });

document.addEventListener('DOMContentLoaded', () => {
  // Показать/скрыть .div_text_ev при наведении на .even_*
  const evenElements = document.querySelectorAll('[class^="even_"]');

  evenElements.forEach(even => {
    const divTextEv = even.querySelector('.div_text_ev');

    even.addEventListener('mouseenter', () => {
      if (divTextEv) {
        divTextEv.style.display = 'flex';
      }
    });

    even.addEventListener('mouseleave', () => {
      if (divTextEv) {
        divTextEv.style.display = 'none';
      }
    });
  });

  // Показать .modal-overlay_bl и .modal-window при нажатии на .div_visit
  const divVisitElements = document.querySelectorAll('.div_visit');

  divVisitElements.forEach(divVisit => {
    divVisit.addEventListener('click', () => {
      if (modOverlayBl && modWindow) {
        modOverlayBl.style.display = 'block';
        modWindow.style.display = 'flex';
      }
    });
  });
});

document.querySelector('.div_send_bl').addEventListener('click', () => {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');

  let isValid = true;

  [nameInput, emailInput, phoneInput].forEach(input => {
    input.classList.remove('error');
  });

  if (nameInput.value.trim() === '') {
    nameInput.classList.add('error');
    isValid = false;
  }
  if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
    emailInput.classList.add('error');
    isValid = false;
  }
  if (phoneInput.value.trim() === '' || !/^\d+$/.test(phoneInput.value)) {
    phoneInput.classList.add('error');
    isValid = false;
  }

  // Если все поля валидны, скрываем модальное окно и показываем сообщение
  if (isValid) {
    modWindow.style.display = 'none';
    modSend.style.display = 'flex';
  }
});

// Функция для очистки полей ввода
function clearInputs() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');

  nameInput.value = '';
  nameInput.classList = 'imp';
  emailInput.value = '';
  emailInput.classList = 'imp';
  phoneInput.value = '';
  phoneInput.classList = 'imp';
}

// Закрытие модального окна по кнопке
if (closeButton) {
  closeButton.addEventListener('click', () => {
    if (modOverlayBl && modWindow) {
      modOverlayBl.style.display = 'none';
      modWindow.style.display = 'none';
      clearInputs(); // Очищаем поля ввода
    }
  });
}

if (closeBut) {
  closeBut.addEventListener('click', () => {
    if (modOverlayBl && modSend) {
      modOverlayBl.style.display = 'none';
      modSend.style.display = 'none';
      clearInputs(); // Очищаем поля ввода
    }
  });
}

// Закрытие модального окна по клику вне окна
if (modOverlayBl) {
  modOverlayBl.addEventListener('click', (e) => {
    if (e.target === modOverlayBl) {
      modOverlayBl.style.display = 'none';
      modWindow.style.display = 'none';
      modSend.style.display = 'none';
      clearInputs(); // Очищаем поля ввода
    }
  });
}
