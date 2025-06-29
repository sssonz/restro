document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container_st');
  const scr_but = document.querySelector('.scroll');

  const isMobile = window.innerWidth <= 786;

  // Объявим переменные для элементов, которые зависят от версии
  let grid_photo;
  let imgs = {};
  // Общие элементы
  const st_fr = document.querySelector('.st_fr');
  const st_am = document.querySelector('.st_am');
  const st_yp = document.querySelector('.st_yp');
  const st_it = document.querySelector('.st_it');
  const st_sl = document.querySelector('.st_sl');

  if (!isMobile) {
    // Десктоп: исходные классы
    grid_photo = document.querySelector('.grid_photo');

    imgs = {
      img_st_1: document.querySelector('.img_st_1'),
      img_st_16: document.querySelector('.img_st_16'),
      img_st_5: document.querySelector('.img_st_5'),
      img_st_10: document.querySelector('.img_st_10'),
      img_st_6: document.querySelector('.img_st_6'),
      img_st_13: document.querySelector('.img_st_13'),
      img_st_8: document.querySelector('.img_st_8'),
      img_st_11: document.querySelector('.img_st_11'),
      img_st_3: document.querySelector('.img_st_3'),
      img_st_17: document.querySelector('.img_st_17'),
      img_st_9: document.querySelector('.img_st_9'),
      img_st_12: document.querySelector('.img_st_12'),
      img_st_4: document.querySelector('.img_st_4'),
      img_st_15: document.querySelector('.img_st_15'),
      img_st_2: document.querySelector('.img_st_2'),
      img_st_18: document.querySelector('.img_st_18'),
      img_st_7: document.querySelector('.img_st_7'),
      img_st_14: document.querySelector('.img_st_14'),
    };
  } else {
    // Мобильная версия: .grid_photo_pl и img_st_1_pl ... img_st_9_pl
    grid_photo = document.querySelector('.grid_photo_pl');

    imgs = {
      img_st_1_pl: document.querySelector('.img_st_1_pl'),
      img_st_2_pl: document.querySelector('.img_st_2_pl'),
      img_st_3_pl: document.querySelector('.img_st_3_pl'),
      img_st_4_pl: document.querySelector('.img_st_4_pl'),
      img_st_5_pl: document.querySelector('.img_st_5_pl'),
      img_st_6_pl: document.querySelector('.img_st_6_pl'),
      img_st_7_pl: document.querySelector('.img_st_7_pl'),
      img_st_8_pl: document.querySelector('.img_st_8_pl'),
      img_st_9_pl: document.querySelector('.img_st_9_pl'),
    };
  }

  // Получим оригинальные backgroundImage для всех img, которые есть
  const originalBg = {};
  for (const key in imgs) {
    if (imgs[key]) {
      originalBg[key] = getComputedStyle(imgs[key]).backgroundImage;
    }
  }

  // Зададим новые backgroundImage для img в зависимости от версии
  // Для десктопа - как в исходном коде
  // Для мобилки - сделаем аналоги с номерами 1..9

  const newBg = {};

  if (!isMobile) {
    newBg.img_st_1 = 'url(./img/st_1.1.png)';
    newBg.img_st_16 = 'url(./img/st_16.1.png)';
    newBg.img_st_5 = 'url(./img/st_5.1.png)';
    newBg.img_st_10 = 'url(./img/st_10.1.png)';
    newBg.img_st_6 = 'url(./img/st_6.1.png)';
    newBg.img_st_13 = 'url(./img/st_13.1.png)';
    newBg.img_st_8 = 'url(./img/st_8.1.png)';
    newBg.img_st_11 = 'url(./img/st_11.1.png)';
    newBg.img_st_3 = 'url(./img/st_3.1.png)';
    newBg.img_st_17 = 'url(./img/st_17.1.png)';
    newBg.img_st_9 = 'url(./img/st_9.1.png)';
    newBg.img_st_12 = 'url(./img/st_12.1.png)';
    newBg.img_st_4 = 'url(./img/st_4.1.png)';
    newBg.img_st_15 = 'url(./img/st_15.1.png)';
    newBg.img_st_2 = 'url(./img/st_2.1.png)';
    newBg.img_st_18 = 'url(./img/st_18.1.png)';
    newBg.img_st_7 = 'url(./img/st_7.1.png)';
    newBg.img_st_14 = 'url(./img/st_14.1.png)';
  } else {
      newBg.img_st_1_pl= 'url(./img/st_1.1.png)';
      newBg.img_st_2_pl = 'url(./img/st_16.1.png)';
      newBg.img_st_3_pl = 'url(./img/st_5.1.png)';
      newBg.img_st_4_pl = 'url(./img/st_10.1.png)';
      newBg.img_st_5_pl = 'url(./img/st_6.1.png)';
      newBg.img_st_6_pl = 'url(./img/st_13.1.png)';
      newBg.img_st_7_pl = 'url(./img/st_8.1.png)';
      newBg.img_st_8_pl = 'url(./img/st_11.1.png)';
      newBg.img_st_9_pl = 'url(./img/st_3.1.png)';
  }

  function setBg(elem, bg) {
    if (elem) elem.style.backgroundImage = bg;
  }

  function resetBg(elem, key) {
    if (elem && originalBg[key]) elem.style.backgroundImage = originalBg[key];
  }

  function show(elem) {
    if (elem) elem.style.display = 'grid';
  }
  function hide(elem) {
    if (elem) elem.style.display = 'none';
  }

  // Изначальное состояние
  hide(st_fr);
  hide(st_am);
  hide(st_yp);
  hide(st_it);
  hide(st_sl);
  show(grid_photo);

  // Для десктопа maxStep=15, для мобилки меньше (например 9, т.к. 9 img)
  const maxStep = isMobile ? 10 : 15;

  let virtualStep = 0;

  function updateState(step) {
    // Сброс бэкграундов для всех img
    for (const key in imgs) {
      resetBg(imgs[key], key);
    }

    // Скрыть все описания и показать по условию
    hide(grid_photo);
    hide(st_fr);
    hide(st_am);
    hide(st_yp);
    hide(st_it);
    hide(st_sl);

    if (step === 0) {
      show(grid_photo);
    } else if (!isMobile) {
      // Десктопная логика (как в исходном коде)
      if (step === 1) {
        scr_but.style.display = 'none';
        show(grid_photo);
        setBg(imgs.img_st_1, newBg.img_st_1);
        setBg(imgs.img_st_16, newBg.img_st_16);
      } else if (step === 2) {
        show(grid_photo);
        setBg(imgs.img_st_1, newBg.img_st_1);
        setBg(imgs.img_st_16, newBg.img_st_16);
        setBg(imgs.img_st_5, newBg.img_st_5);
        setBg(imgs.img_st_10, newBg.img_st_10);
      } else if (step === 3) {
        show(grid_photo);
        setBg(imgs.img_st_1, newBg.img_st_1);
        setBg(imgs.img_st_16, newBg.img_st_16);
        setBg(imgs.img_st_5, newBg.img_st_5);
        setBg(imgs.img_st_10, newBg.img_st_10);
        setBg(imgs.img_st_6, newBg.img_st_6);
        setBg(imgs.img_st_13, newBg.img_st_13);
      } else if (step === 4) {
        show(grid_photo);
        setBg(imgs.img_st_1, newBg.img_st_1);
        setBg(imgs.img_st_16, newBg.img_st_16);
        setBg(imgs.img_st_5, newBg.img_st_5);
        setBg(imgs.img_st_10, newBg.img_st_10);
        setBg(imgs.img_st_6, newBg.img_st_6);
        setBg(imgs.img_st_13, newBg.img_st_13);
        setBg(imgs.img_st_8, newBg.img_st_8);
        setBg(imgs.img_st_11, newBg.img_st_11);
      } else if (step === 5) {
        show(grid_photo);
        setBg(imgs.img_st_1, newBg.img_st_1);
        setBg(imgs.img_st_16, newBg.img_st_16);
        setBg(imgs.img_st_5, newBg.img_st_5);
        setBg(imgs.img_st_10, newBg.img_st_10);
        setBg(imgs.img_st_6, newBg.img_st_6);
        setBg(imgs.img_st_13, newBg.img_st_13);
        setBg(imgs.img_st_8, newBg.img_st_8);
        setBg(imgs.img_st_11, newBg.img_st_11);
        setBg(imgs.img_st_3, newBg.img_st_3);
        setBg(imgs.img_st_17, newBg.img_st_17);
      } else if (step === 6) {
        show(grid_photo);
        setBg(imgs.img_st_1, newBg.img_st_1);
        setBg(imgs.img_st_16, newBg.img_st_16);
        setBg(imgs.img_st_5, newBg.img_st_5);
        setBg(imgs.img_st_10, newBg.img_st_10);
        setBg(imgs.img_st_6, newBg.img_st_6);
        setBg(imgs.img_st_13, newBg.img_st_13);
        setBg(imgs.img_st_8, newBg.img_st_8);
        setBg(imgs.img_st_11, newBg.img_st_11);
        setBg(imgs.img_st_3, newBg.img_st_3);
        setBg(imgs.img_st_17, newBg.img_st_17);
        setBg(imgs.img_st_9, newBg.img_st_9);
        setBg(imgs.img_st_12, newBg.img_st_12);
      } else if (step === 7) {
        show(grid_photo);
        setBg(imgs.img_st_1, newBg.img_st_1);
        setBg(imgs.img_st_16, newBg.img_st_16);
        setBg(imgs.img_st_5, newBg.img_st_5);
        setBg(imgs.img_st_10, newBg.img_st_10);
        setBg(imgs.img_st_6, newBg.img_st_6);
        setBg(imgs.img_st_13, newBg.img_st_13);
        setBg(imgs.img_st_8, newBg.img_st_8);
        setBg(imgs.img_st_11, newBg.img_st_11);
        setBg(imgs.img_st_3, newBg.img_st_3);
        setBg(imgs.img_st_17, newBg.img_st_17);
        setBg(imgs.img_st_9, newBg.img_st_9);
        setBg(imgs.img_st_12, newBg.img_st_12);
        setBg(imgs.img_st_4, newBg.img_st_4);
        setBg(imgs.img_st_15, newBg.img_st_15);
      } else if (step === 8) {
        show(grid_photo);
        setBg(imgs.img_st_1, newBg.img_st_1);
        setBg(imgs.img_st_16, newBg.img_st_16);
        setBg(imgs.img_st_5, newBg.img_st_5);
        setBg(imgs.img_st_10, newBg.img_st_10);
        setBg(imgs.img_st_6, newBg.img_st_6);
        setBg(imgs.img_st_13, newBg.img_st_13);
        setBg(imgs.img_st_8, newBg.img_st_8);
        setBg(imgs.img_st_11, newBg.img_st_11);
        setBg(imgs.img_st_3, newBg.img_st_3);
        setBg(imgs.img_st_17, newBg.img_st_17);
        setBg(imgs.img_st_9, newBg.img_st_9);
        setBg(imgs.img_st_12, newBg.img_st_12);
        setBg(imgs.img_st_4, newBg.img_st_4);
        setBg(imgs.img_st_15, newBg.img_st_15);
        setBg(imgs.img_st_2, newBg.img_st_2);
        setBg(imgs.img_st_18, newBg.img_st_18);
      } else if (step === 9) {
        show(grid_photo);
        setBg(imgs.img_st_1, newBg.img_st_1);
        setBg(imgs.img_st_16, newBg.img_st_16);
        setBg(imgs.img_st_5, newBg.img_st_5);
        setBg(imgs.img_st_10, newBg.img_st_10);
        setBg(imgs.img_st_6, newBg.img_st_6);
        setBg(imgs.img_st_13, newBg.img_st_13);
        setBg(imgs.img_st_8, newBg.img_st_8);
        setBg(imgs.img_st_11, newBg.img_st_11);
        setBg(imgs.img_st_3, newBg.img_st_3);
        setBg(imgs.img_st_17, newBg.img_st_17);
        setBg(imgs.img_st_9, newBg.img_st_9);
        setBg(imgs.img_st_12, newBg.img_st_12);
        setBg(imgs.img_st_4, newBg.img_st_4);
        setBg(imgs.img_st_15, newBg.img_st_15);
        setBg(imgs.img_st_2, newBg.img_st_2);
        setBg(imgs.img_st_18, newBg.img_st_18);
        setBg(imgs.img_st_7, newBg.img_st_7);
        setBg(imgs.img_st_14, newBg.img_st_14);
      } else if (step === 10) {
        show(st_fr);
      } else if (step === 11) {
        show(st_am);
      } else if (step === 12) {
        show(st_yp);
      } else if (step === 13) {
        show(st_it);
      } else if (step >= 14) {
        show(st_sl);
      }
    } 
    
    else {
      if (step === 1) {
        scr_but.style.display = 'none';
        show(grid_photo);
        setBg(imgs.img_st_1_pl, newBg.img_st_1_pl);
        setBg(imgs.img_st_5_pl, newBg.img_st_5_pl);
      } else if (step === 2) {
        show(grid_photo);
        setBg(imgs.img_st_1_pl, newBg.img_st_1_pl);
        setBg(imgs.img_st_5_pl, newBg.img_st_5_pl);
        setBg(imgs.img_st_6_pl, newBg.img_st_6_pl);
        setBg(imgs.img_st_7_pl, newBg.img_st_7_pl);
      } else if (step === 3) {
        show(grid_photo);
        setBg(imgs.img_st_1_pl, newBg.img_st_1_pl);
        setBg(imgs.img_st_5_pl, newBg.img_st_5_pl);
        setBg(imgs.img_st_6_pl, newBg.img_st_6_pl);
        setBg(imgs.img_st_7_pl, newBg.img_st_7_pl);
        setBg(imgs.img_st_2_pl, newBg.img_st_2_pl);
        setBg(imgs.img_st_9_pl, newBg.img_st_9_pl);
      } else if (step === 4) {
        show(grid_photo);
        setBg(imgs.img_st_1_pl, newBg.img_st_1_pl);
        setBg(imgs.img_st_5_pl, newBg.img_st_5_pl);
        setBg(imgs.img_st_6_pl, newBg.img_st_6_pl);
        setBg(imgs.img_st_7_pl, newBg.img_st_7_pl);
        setBg(imgs.img_st_2_pl, newBg.img_st_2_pl);
        setBg(imgs.img_st_9_pl, newBg.img_st_9_pl);
        setBg(imgs.img_st_4_pl, newBg.img_st_4_pl);
        setBg(imgs.img_st_8_pl, newBg.img_st_8_pl);
      } else if (step === 5) {
        show(grid_photo);
        setBg(imgs.img_st_1_pl, newBg.img_st_1_pl);
        setBg(imgs.img_st_5_pl, newBg.img_st_5_pl);
        setBg(imgs.img_st_6_pl, newBg.img_st_6_pl);
        setBg(imgs.img_st_7_pl, newBg.img_st_7_pl);
        setBg(imgs.img_st_2_pl, newBg.img_st_2_pl);
        setBg(imgs.img_st_9_pl, newBg.img_st_9_pl);
        setBg(imgs.img_st_4_pl, newBg.img_st_4_pl);
        setBg(imgs.img_st_8_pl, newBg.img_st_8_pl);
        setBg(imgs.img_st_3_pl, newBg.img_st_3_pl);
      }  else if (step === 6) {
        show(st_fr);
      } else if (step === 7) {
        show(st_am);
      } else if (step === 8) {
        show(st_yp);
      } else if (step === 9) {
        show(st_it);
      } else if (step >= 10) {
        show(st_sl);
      }
    }
  }

  let isThrottled = false;
  const throttleDelay = 300; // мс задержки между срабатываниями

  container.addEventListener('wheel', (event) => {
    event.preventDefault();

    if (isThrottled) return;

    if (event.deltaY > 0) {
      virtualStep = Math.min(maxStep, virtualStep + 1);
    } else if (event.deltaY < 0) {
      virtualStep = Math.max(0, virtualStep - 1);
    }

    updateState(virtualStep);

    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
    }, throttleDelay);
  }, { passive: false });
});