document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container_st');
  const scr_but = document.querySelector('.scroll');

  const img_st_1 = document.querySelector('.img_st_1');
  const img_st_16 = document.querySelector('.img_st_16');
  const img_st_5 = document.querySelector('.img_st_5');
  const img_st_10 = document.querySelector('.img_st_10');
  const img_st_6 = document.querySelector('.img_st_6');
  const img_st_13 = document.querySelector('.img_st_13');
  const img_st_8 = document.querySelector('.img_st_8');
  const img_st_11 = document.querySelector('.img_st_11');
  const img_st_3 = document.querySelector('.img_st_3');
  const img_st_17 = document.querySelector('.img_st_17');
  const img_st_9 = document.querySelector('.img_st_9');
  const img_st_12 = document.querySelector('.img_st_12');
  const img_st_4 = document.querySelector('.img_st_4');
  const img_st_15 = document.querySelector('.img_st_15');
  const img_st_2 = document.querySelector('.img_st_2');
  const img_st_18 = document.querySelector('.img_st_18');
  const img_st_7 = document.querySelector('.img_st_7');
  const img_st_14 = document.querySelector('.img_st_14');

  const grid_photo = document.querySelector('.grid_photo');
  const st_fr = document.querySelector('.st_fr');
  const st_am = document.querySelector('.st_am');
  const st_yp = document.querySelector('.st_yp');
  const st_it = document.querySelector('.st_it');
  const st_sl = document.querySelector('.st_sl');

  const originalBg = {
    img_st_1: getComputedStyle(img_st_1).backgroundImage,
    img_st_16: getComputedStyle(img_st_16).backgroundImage,
    img_st_5: getComputedStyle(img_st_5).backgroundImage,
    img_st_10: getComputedStyle(img_st_10).backgroundImage,
    img_st_6: getComputedStyle(img_st_6).backgroundImage,
    img_st_13: getComputedStyle(img_st_13).backgroundImage,
    img_st_8: getComputedStyle(img_st_8).backgroundImage,
    img_st_11: getComputedStyle(img_st_11).backgroundImage,
    img_st_3: getComputedStyle(img_st_3).backgroundImage,
    img_st_17: getComputedStyle(img_st_17).backgroundImage,
    img_st_9: getComputedStyle(img_st_9).backgroundImage,
    img_st_12: getComputedStyle(img_st_12).backgroundImage,
    img_st_4: getComputedStyle(img_st_4).backgroundImage,
    img_st_15: getComputedStyle(img_st_15).backgroundImage,
    img_st_2: getComputedStyle(img_st_2).backgroundImage,
    img_st_18: getComputedStyle(img_st_18).backgroundImage,
    img_st_7: getComputedStyle(img_st_7).backgroundImage,
    img_st_14: getComputedStyle(img_st_14).backgroundImage,
  };

  const newBg = {
    img_st_1: 'url(./img/st_1.1.png)',
    img_st_16: 'url(./img/st_16.1.png)',
    img_st_5: 'url(./img/st_5.1.png)',
    img_st_10: 'url(./img/st_10.1.png)',
    img_st_6: 'url(./img/st_6.1.png)',
    img_st_13: 'url(./img/st_13.1.png)',
    img_st_8: 'url(./img/st_8.1.png)',
    img_st_11: 'url(./img/st_11.1.png)',
    img_st_3: 'url(./img/st_3.1.png)',
    img_st_17: 'url(./img/st_17.1.png)',
    img_st_9: 'url(./img/st_9.1.png)',
    img_st_12: 'url(./img/st_12.1.png)',
    img_st_4: 'url(./img/st_4.1.png)',
    img_st_15: 'url(./img/st_15.1.png)',
    img_st_2: 'url(./img/st_2.1.png)',
    img_st_18: 'url(./img/st_18.1.png)',
    img_st_7: 'url(./img/st_7.1.png)',
    img_st_14: 'url(./img/st_14.1.png)',
  };

  function setBg(elem, bg) {
    if (elem) elem.style.backgroundImage = bg;
  }

  function resetBg(elem, key) {
    if (elem) elem.style.backgroundImage = originalBg[key];
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

  // Будем управлять виртуальной позицией скролла в диапазоне 0..14
  let virtualStep = 0;
  const maxStep = 15;

  // Функция обновления состояния в зависимости от virtualStep
  function updateState(step) {
    // Сначала сбросим все bg
    resetBg(img_st_1, 'img_st_1');
    resetBg(img_st_16, 'img_st_16');
    resetBg(img_st_5, 'img_st_5');
    resetBg(img_st_10, 'img_st_10');
    resetBg(img_st_6, 'img_st_6');
    resetBg(img_st_13, 'img_st_13');
    resetBg(img_st_8, 'img_st_8');
    resetBg(img_st_11, 'img_st_11');
    resetBg(img_st_3, 'img_st_3');
    resetBg(img_st_17, 'img_st_17');
    resetBg(img_st_9, 'img_st_9');
    resetBg(img_st_12, 'img_st_12');
    resetBg(img_st_4, 'img_st_4');
    resetBg(img_st_15, 'img_st_15');
    resetBg(img_st_2, 'img_st_2');
    resetBg(img_st_18, 'img_st_18');
    resetBg(img_st_7, 'img_st_7');
    resetBg(img_st_14, 'img_st_14');

    // Скрыть все описания и показать по условию
    hide(grid_photo);
    hide(st_fr);
    hide(st_am);
    hide(st_yp);
    hide(st_it);
    hide(st_sl);

    if (step === 0) {
      show(grid_photo);
    } else if (step === 1) {
      scr_but.style.display ='none';
      show(grid_photo);
      setBg(img_st_1, newBg.img_st_1);
      setBg(img_st_16, newBg.img_st_16);
    } else if (step === 2) {
      show(grid_photo);
      setBg(img_st_1, newBg.img_st_1);
      setBg(img_st_16, newBg.img_st_16);
      setBg(img_st_5, newBg.img_st_5);
      setBg(img_st_10, newBg.img_st_10);
    } else if (step === 3) {
      show(grid_photo);
      setBg(img_st_1, newBg.img_st_1);
      setBg(img_st_16, newBg.img_st_16);
      setBg(img_st_5, newBg.img_st_5);
      setBg(img_st_10, newBg.img_st_10);
      setBg(img_st_6, newBg.img_st_6);
      setBg(img_st_13, newBg.img_st_13);
    } else if (step === 4) {
      show(grid_photo);
      setBg(img_st_1, newBg.img_st_1);
      setBg(img_st_16, newBg.img_st_16);
      setBg(img_st_5, newBg.img_st_5);
      setBg(img_st_10, newBg.img_st_10);
      setBg(img_st_6, newBg.img_st_6);
      setBg(img_st_13, newBg.img_st_13);
      setBg(img_st_8, newBg.img_st_8);
      setBg(img_st_11, newBg.img_st_11);
    } else if (step === 5) {
      show(grid_photo);
      setBg(img_st_1, newBg.img_st_1);
      setBg(img_st_16, newBg.img_st_16);
      setBg(img_st_5, newBg.img_st_5);
      setBg(img_st_10, newBg.img_st_10);
      setBg(img_st_6, newBg.img_st_6);
      setBg(img_st_13, newBg.img_st_13);
      setBg(img_st_8, newBg.img_st_8);
      setBg(img_st_11, newBg.img_st_11);
      setBg(img_st_3, newBg.img_st_3);
      setBg(img_st_17, newBg.img_st_17);
    } else if (step === 6) {
      show(grid_photo);
      setBg(img_st_1, newBg.img_st_1);
      setBg(img_st_16, newBg.img_st_16);
      setBg(img_st_5, newBg.img_st_5);
      setBg(img_st_10, newBg.img_st_10);
      setBg(img_st_6, newBg.img_st_6);
      setBg(img_st_13, newBg.img_st_13);
      setBg(img_st_8, newBg.img_st_8);
      setBg(img_st_11, newBg.img_st_11);
      setBg(img_st_3, newBg.img_st_3);
      setBg(img_st_17, newBg.img_st_17);
      setBg(img_st_9, newBg.img_st_9);
      setBg(img_st_12, newBg.img_st_12);
    } else if (step === 7) {
      show(grid_photo);
      setBg(img_st_1, newBg.img_st_1);
      setBg(img_st_16, newBg.img_st_16);
      setBg(img_st_5, newBg.img_st_5);
      setBg(img_st_10, newBg.img_st_10);
      setBg(img_st_6, newBg.img_st_6);
      setBg(img_st_13, newBg.img_st_13);
      setBg(img_st_8, newBg.img_st_8);
      setBg(img_st_11, newBg.img_st_11);
      setBg(img_st_3, newBg.img_st_3);
      setBg(img_st_17, newBg.img_st_17);
      setBg(img_st_9, newBg.img_st_9);
      setBg(img_st_12, newBg.img_st_12);
      setBg(img_st_4, newBg.img_st_4);
      setBg(img_st_15, newBg.img_st_15);
    } else if (step === 8) {
      show(grid_photo);
      setBg(img_st_1, newBg.img_st_1);
      setBg(img_st_16, newBg.img_st_16);
      setBg(img_st_5, newBg.img_st_5);
      setBg(img_st_10, newBg.img_st_10);
      setBg(img_st_6, newBg.img_st_6);
      setBg(img_st_13, newBg.img_st_13);
      setBg(img_st_8, newBg.img_st_8);
      setBg(img_st_11, newBg.img_st_11);
      setBg(img_st_3, newBg.img_st_3);
      setBg(img_st_17, newBg.img_st_17);
      setBg(img_st_9, newBg.img_st_9);
      setBg(img_st_12, newBg.img_st_12);
      setBg(img_st_4, newBg.img_st_4);
      setBg(img_st_15, newBg.img_st_15);
      setBg(img_st_2, newBg.img_st_2);
      setBg(img_st_18, newBg.img_st_18);
    } else if (step === 9) {
      show(grid_photo);
      setBg(img_st_1, newBg.img_st_1);
      setBg(img_st_16, newBg.img_st_16);
      setBg(img_st_5, newBg.img_st_5);
      setBg(img_st_10, newBg.img_st_10);
      setBg(img_st_6, newBg.img_st_6);
      setBg(img_st_13, newBg.img_st_13);
      setBg(img_st_8, newBg.img_st_8);
      setBg(img_st_11, newBg.img_st_11);
      setBg(img_st_3, newBg.img_st_3);
      setBg(img_st_17, newBg.img_st_17);
      setBg(img_st_9, newBg.img_st_9);
      setBg(img_st_12, newBg.img_st_12);
      setBg(img_st_4, newBg.img_st_4);
      setBg(img_st_15, newBg.img_st_15);
      setBg(img_st_2, newBg.img_st_2);
      setBg(img_st_18, newBg.img_st_18);
      setBg(img_st_7, newBg.img_st_7);
      setBg(img_st_14, newBg.img_st_14);
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

  let isThrottled = false;
  const throttleDelay = 300; // мс задержки между срабатываниями

  container.addEventListener('wheel', (event) => {
    event.preventDefault();

    if (isThrottled) return; // игнорируем, если ещё в задержке

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
