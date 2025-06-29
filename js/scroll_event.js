let scrollPos = 0;
const evenContainer = document.querySelector('.div_even');
const evenContainer_pl = document.querySelector('.div_even_pl');
const closeButton = document.querySelector('.mod-close_bl');
const closeBut = document.querySelector('.send-close_bl');
const modOverlayBl = document.querySelector('.modal-overlay_bl');
const modSend = document.querySelector('.modal-send_bl');
const modWindow = document.querySelector('.modal-window_bl');
const scr_but = document.querySelector('.scroll');

const isMobileOrTablet = window.innerWidth <= 769;

// Скролл по колесу мыши
document.addEventListener('wheel', (event) => {
  event.preventDefault();

  if (!isMobileOrTablet) {
    // Десктоп: горизонтальный скролл
    scrollPos += event.deltaY;
    scrollPos -= event.deltaX;

    const maxScroll = evenContainer.scrollWidth - window.innerWidth;
    scrollPos = Math.max(0, Math.min(scrollPos, maxScroll));

    scr_but.style.display = 'none';
    evenContainer.style.transform = `translateX(${scrollPos}px)`;
  } else {
    // MOBILE/TABLET: вертикальный скролл
    scrollPos += event.deltaY;

    const maxScroll = evenContainer_pl.scrollHeight - window.innerHeight;
    scrollPos = Math.max(0, Math.min(scrollPos, maxScroll));

    scr_but.style.display = 'none';
    evenContainer_pl.style.transform = `translateY(${-scrollPos}px)`;
  }
}, { passive: false });

document.addEventListener('DOMContentLoaded', () => {
  // Показать/скрыть .div_text_ev при наведении на .even_* (только десктоп)
  if (!isMobileOrTablet) {
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
  }

  // На всех устройствах (в том числе моб и планшет) открываем модальное окно по клику на .div_visit
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

// Отправка формы
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

  if (isValid) {
    modWindow.style.display = 'none';
    modSend.style.display = 'flex';
  }
});

// Очистка полей ввода
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

// Закрытие модального окна
if (closeButton) {
  closeButton.addEventListener('click', () => {
    if (modOverlayBl && modWindow) {
      modOverlayBl.style.display = 'none';
      modWindow.style.display = 'none';
      clearInputs();
    }
  });
}

if (closeBut) {
  closeBut.addEventListener('click', () => {
    if (modOverlayBl && modSend) {
      modOverlayBl.style.display = 'none';
      modSend.style.display = 'none';
      clearInputs();
    }
  });
}

if (modOverlayBl) {
  modOverlayBl.addEventListener('click', (e) => {
    if (e.target === modOverlayBl) {
      modOverlayBl.style.display = 'none';
      modWindow.style.display = 'none';
      modSend.style.display = 'none';
      clearInputs();
    }
  });
}