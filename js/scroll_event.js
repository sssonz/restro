let scrollPos = 0;
const evenContainer = document.querySelector('.div_even');
const closeModalButton = document.querySelector('.modal-close_bl');
const modalOverlayBl = document.querySelector('.modal-overlay_bl');
const modalSend = document.querySelector('.modal-send_bl');
const modalWindow = document.querySelector('.modal-window_bl');

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
      if (modalOverlayBl && modalWindow) {
        modalOverlayBl.style.display = 'block';
        modalWindow.style.display = 'flex';
      }
    });
  });
});

document.querySelector('.div_send_bl').addEventListener('click', () => {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const modalSend = document.querySelector('.modal-send_bl');
  const modalWindow = document.querySelector('.modal-window_bl');

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
    modalWindow.style.display = 'none';
    modalSend.style.display = 'flex';
  }
});

// Функция для очистки полей ввода
function clearInputs() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');

  nameInput.value = '';
  nameInput.classList = '';
  emailInput.value = '';
  emailInput.classList = '';
  phoneInput.value = '';
  phoneInput.classList = '';

}

// Закрытие модального окна по кнопке
if (closeModalButton) {
  closeModalButton.addEventListener('click', () => {
    if (modalOverlay && modalWindow) {
      modalOverlay.style.display = 'none';
      modalWindow.style.display = 'none';
      modalSend.style.display = 'none';
      clearInputs(); // Очищаем поля ввода
    }
  });
}

// Закрытие модального окна по клику вне окна
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = 'none';
      modalWindow.style.display = 'none';
      modalSend.style.display = 'none';
      clearInputs(); // Очищаем поля ввода
    }
  });
}
