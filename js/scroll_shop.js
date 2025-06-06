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
  const maxScroll = merchContainer.scrollWidth*1.035 - window.innerWidth;
  scrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));

  merchContainer.style.transform = `translateX(${scrollPosition}px)`;
}, { passive: false });

// Функция увеличения карточки и шрифтов при наведении
function enlargeCard(card) {
  // Устанавливаем фиксированные размеры
  card.style.width = '23.3333vw';
  card.style.height = '24.9479vw';
  card.style.transition = 'width 0.3s ease, height 0.3s ease';

  // Увеличиваем шрифты внутри .text_merch
  const h6 = card.querySelector('.h6_medium');
  const h5 = card.querySelector('.h5_medium');
  const mer = card.querySelector('.mer');
  if (h6) {
    h6.style.transition = 'font-size 0.3s ease';
    h6.style.fontSize = '1.25vw'; // пример увеличения, подкорректируйте под дизайн
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
  merDiv.style.backgroundColor = ''; // сброс к css
}

// Навешиваем обработчики на каждую карточку
merchCards.forEach(card => {
  // Наведение на карточку — увеличиваем размеры и шрифты
  card.addEventListener('mouseenter', () => {
    enlargeCard(card);
  });

  // Уход курсора — сбрасываем размеры и шрифты
  card.addEventListener('mouseleave', () => {
    resetCard(card);
  });

  // Внутренний div с классом .mer
  const merDiv = card.querySelector('.mer');
  if (merDiv) {
    merDiv.addEventListener('mouseenter', () => {
      changeMerColor(merDiv);
    });
    merDiv.addEventListener('mouseleave', () => {
      resetMerColor(merDiv);
    });

    // Клик по .mer — открываем модальное окно
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

    // Сброс ошибок
    [nameInput, emailInput, phoneInput].forEach(input => {
        input.classList.remove('error');
    });

    // Проверка имени
    if (nameInput.value.trim() === '') {
        nameInput.classList.add('error');
        isValid = false;
    }

    // Проверка почты
    if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
        emailInput.classList.add('error');
        isValid = false;
    }

    // Проверка телефона
    if (phoneInput.value.trim() === '' || !/^\d+$/.test(phoneInput.value)) {
        phoneInput.classList.add('error');
        isValid = false;
    }

    // Если все поля валидны, скрываем модальное окно и показываем сообщение
    if (isValid) {
        document.querySelector('.modal-window').style.display = 'none';
        document.querySelector('.modal-send').style.display = 'flex';
    }
});

// Закрытие модального окна по кнопке
if (closeModalButton) {
  closeModalButton.addEventListener('click', () => {
    if (modalOverlay && modalWindow) {
      modalOverlay.style.display = 'none';
      modalWindow.style.display = 'none';
      modalSend.style.display = 'none';
    }
  });
}

// Закрытие модального окна по кнопке
if (closeModalButton) {
  closeModalButton.addEventListener('click', () => {
    if (modalOverlay && modalSend) {
      modalOverlay.style.display = 'none';
      modalSend.style.display = 'none';
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
    }
  });
}