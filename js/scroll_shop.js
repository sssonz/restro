let scrollPosition = 0;
const merchContainer = document.querySelector('.div_merch');
const merchCards = merchContainer.querySelectorAll('.merch');
const modalOverlay = document.querySelector('.modal-overlay');
const modalWindow = document.querySelector('.modal-window');
const closeModalButton = document.querySelector('.modal-close');
const modalSend = document.querySelector('.modal-send');

// Горизонтальный скролл по колесу мыши
document.addEventListener('wheel', (event) => {
  event.preventDefault();
  // Учитываем только вертикальную прокрутку для горизонтального движения
  scrollPosition += event.deltaY;
  scrollPosition -= event.deltaX;

  // Ограничиваем в пределах
  const maxScroll = merchContainer.scrollWidth * 1.035 - window.innerWidth;
  scrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));

  merchContainer.style.transform = `translateX(${scrollPosition}px)`;
}, { passive: false });

// Функция увеличения карточки и шрифтов при наведении
function enlargeCard(card) {
  card.style.width = '23.3333vw';
  card.style.height = '24.9479vw';
  card.style.transition = 'width 0.3s ease, height 0.3s ease';

  const h6 = card.querySelector('.h6_medium');
  const h5 = card.querySelector('.h5_medium');
  const mer = card.querySelector('.mer');
  if (h6) {
    h6.style.transition = 'font-size 0.3s ease';
    h6.style.fontSize = '1.25vw';
  }
  if (h5) {
    h5.style.transition = 'font-size 0.3s ease';
    h5.style.fontSize = '1.5625vw';
  }
  if (mer) {
    mer.style.transition = 'width 0.3s ease, height 0.3s ease';
    mer.style.width = '3.3854vw';
    mer.style.height = '3.3854vw';
  }
}

// Функция возврата к исходным размерам и шрифтам
function resetCard(card) {
  card.style.width = '';
  card.style.height = '';
  const h6 = card.querySelector('.h6_medium');
  const h5 = card.querySelector('.h5_medium');
  const mer = card.querySelector('.mer');
  if (h6) {
    h6.style.fontSize = '';
  }
  if (h5) {
    h5.style.fontSize = '';
  }
  if (mer) {
    mer.style.width = '';
    mer.style.height = '';
  }
}

// Функция изменения цвета .mer при наведении
function changeMerColor(merDiv) {
  merDiv.style.transition = 'background-color 0.3s ease';
  merDiv.style.backgroundColor = '#1F1F1F';
}

// Функция сброса цвета .mer
function resetMerColor(merDiv) {
  merDiv.style.backgroundColor = '';
}

// Навешиваем обработчики на каждую карточку
merchCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    enlargeCard(card);
  });

  card.addEventListener('mouseleave', () => {
    resetCard(card);
  });

  const merDiv = card.querySelector('.mer');
  if (merDiv) {
    merDiv.addEventListener('mouseenter', () => {
      changeMerColor(merDiv);
    });
    merDiv.addEventListener('mouseleave', () => {
      resetMerColor(merDiv);
    });

    merDiv.addEventListener('click', () => {
      if (modalOverlay && modalWindow) {
        modalOverlay.style.display = 'block';
        modalWindow.style.display = 'flex';
      }
    });
  }
});

document.querySelector('.div_send').addEventListener('click', () => {
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