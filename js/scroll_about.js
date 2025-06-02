let scrollPosition = 0;

const sections = [
{
container: document.querySelector('.div_ab'),
img: document.querySelector('.ab_img'),
text: document.querySelector('.ab'),
start: 0,
active: false,
animated: true
},
{
container: document.querySelector('.div_st'),
img: document.querySelector('.st_img'),
text: document.querySelector('.st'),
start: window.innerWidth, 
active: false,
animated: true
},
{
container: document.querySelector('.div_sh'),
img: document.querySelector('.sh_img'),
text: document.querySelector('.sh'),
start: window.innerWidth * 2,
active: false,
animated: true
},
{
container: document.querySelector('.div_ev'),
img: document.querySelector('.ev_img'),
text: document.querySelector('.ev'),
start: window.innerWidth * 3,
active: false,
animated: true
},
{
container: document.querySelector('.div_bo'),
img: document.querySelector('.bo_img'),
text: document.querySelector('.bo'),
start: window.innerWidth * 4,
active: false,
animated: false
}
];

const SECTION_WIDTH = window.innerWidth;
const MAX_SCROLL = SECTION_WIDTH * (sections.length - 1);

document.addEventListener('wheel', (event) => {
event.preventDefault();

scrollPosition += event.deltaY;
scrollPosition += event.deltaX;
scrollPosition = Math.max(0, Math.min(scrollPosition, MAX_SCROLL));

sections.forEach((section, index) => {
const { container, img, text, start, animated } = section;
const end = start + SECTION_WIDTH/1.7;
if (scrollPosition >= start && scrollPosition < end) {
  // Активный блок
  section.active = true;
  container.style.display = 'flex';

  const localScroll = scrollPosition - start;
  const offset = Math.min(localScroll, SECTION_WIDTH);

  if (animated) {
    img.style.transform = `translateX(${-offset}px)`;
    text.style.transform = `translateX(${offset}px)`;
  } else {
    img.style.transform = `translateX(0)`;
    text.style.transform = `translateX(0)`;
  }
} else if (scrollPosition < start) {
  // До появления блока — сброс
  section.active = false;
  container.style.display = 'flex';

  if (animated) {
    img.style.transform = `translateX(0)`;
    text.style.transform = `translateX(0)`;
  }
} else if (scrollPosition >= end) {
  // После ухода блока — скрыть
  section.active = false;
  container.style.display = 'none';
}
});
}, { passive: false });