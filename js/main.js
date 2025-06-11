document.addEventListener('DOMContentLoaded', () => {
  // При клике на .logo открываем index.html
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Показать .footer при нажатии на .div_footer
  const footerButton = document.querySelector('.div_footer, .div_footer_bl');
  const footer = document.querySelector('.footer, .footer_bl');

  if (footerButton && footer) {
    footerButton.addEventListener('click', () => {
      footer.style.display = 'flex'; // Показываем .footer
    });
  }

  // Скрыть .footer при нажатии на .div_footer_close
  const closeButton = document.querySelector('.div_footer_close, .div_footer_close_bl');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      footer.style.display = 'none'; // Скрываем .footer
      emailInput.value = ''; // Очищаем поле ввода
      emailInput.style.borderColor = ''; // Сбрасываем обводку
    });
  }

  // Проверка email и открытие модального окна
  const emailInput = document.querySelector('.imp_email, .imp_email_bl');
  const subscribeButton = document.querySelector('.div_sub, .div_sub_bl');
  const modalSend = document.querySelector('.modal-sub, .modal-sub_bl');
  const modalOverlay = document.querySelector('.modal-overlay, .modal-overlay_bl');
  const modalClose = document.querySelector('.modal-close, .modal-close_bl');

  if (subscribeButton) {
    subscribeButton.addEventListener('click', () => {
      const emailValue = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Проверка на наличие @

      if (emailPattern.test(emailValue)) {
        modalSend.style.display = 'flex'; // Показываем модальное окно
        modalOverlay.style.display = 'block'; // Показываем фон
        emailInput.style.borderColor = ''; // Сбрасываем обводку
      } else {
        emailInput.style.borderColor = 'red'; // Устанавливаем красную обводку
      }
    });
  }

  // Закрытие модального окна
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  function closeModal() {
    modalSend.style.display = 'none'; // Скрываем модальное окно
    modalOverlay.style.display = 'none'; // Скрываем фон
    emailInput.value = ''; // Очищаем поле ввода
    emailInput.style.borderColor = ''; // Сбрасываем обводку
  }
});

