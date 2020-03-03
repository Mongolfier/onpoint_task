import '../styles/index.scss';

"use strict";

// большой костыль, который мне не нравится, но нет времени его исправлять:
// слайды должны быть одинаковой высоты
let carousel = document.querySelector('.carousel');
let wrapperItem = document.querySelector('.vertical-carousel-wrapper'); // контейнер блока со слайдами
let heightItem = document.querySelector('.vertical-carousel-item').offsetHeight; // высота одного слайда
let countVerticalItem = document.querySelectorAll('.vertical-carousel-item').length; // количество слайдов
let dots; //

let topWrapper = 0; // начальное положение контенера со сладйами
let activeItem = 0; // номер видимого слайда

// создание навигационных "кружочков". Сколько слайдов, столько и кружочков
(function makeSpan() {
  for (let i = 0; i < countVerticalItem; i++) {
    let newSpan = document.createElement('span');
    document.querySelector('.dots').appendChild(newSpan);
  }
  dots = document.querySelectorAll('span');
  document.querySelector('span').setAttribute('class', 'active'); // добавление первому кружочку статуса "активный"
})();

// Обработчик для вращения колёсика
carousel.addEventListener('wheel', function(e) {
  e = e || window.event;
  e.preventDefault();

  if (e.deltaY > 0) { // если колесико мыши прокручивается вниз

    if ( topWrapper > -( heightItem * (countVerticalItem - 1) ) ) {
      slideUp();
    }

  } else {

    if ( topWrapper != 0 ) {
      slideDown();
    }

  }
});
// обработчики для тача
carousel.addEventListener('touchstart', dragVerticalStart);
carousel.addEventListener('touchend', dragVerticalEnd);

// "прокрутка" слайдов вверх (движение колесика (пальцев) вверх)
function slideUp() {
  topWrapper += -heightItem;  // движение контейнера со слайдами вверх относительно самого слайдера
  wrapperItem.style.top = topWrapper + 'px';
  activeItem = -(topWrapper / heightItem); // выясняю какой слайд сейчас показан на экране
  dots[activeItem-1].classList.remove('active'); // удаление статуса "активный" у кружочка предыдущего слайда
  dots[activeItem].classList.add('active'); // добавление статуса "активный" кружочку показываемого слайда
}

// "прокрутка" слайдов вниз (движение колесика (пальцев) вниз)
function slideDown() {
  topWrapper -= -heightItem;
  wrapperItem.style.top = topWrapper + 'px';
  activeItem = -(topWrapper / heightItem);
  dots[activeItem+1].classList.remove('active');
  dots[activeItem].classList.add('active');
}

// 28.02 в 9:00 я осознал, что задача стоит для тач-экранов а не десктопа. Срочно погружаюсь в мир тач-событий
let dragStartVarY = 0;
let dragEndVarY = 0;

function dragVerticalStart(e) {
  e = e || window.event;
  e.stopPropagation();
  // добавление обработчика на движение пальца
  carousel.addEventListener('touchmove', dragVerticalMove);

  dragStartVarY = e.targetTouches[0].screenY;
}
// не нашёл как выяснить на событии 'touchend' координаты, где убран палец. Поэтому так кривовато сделано :(
function dragVerticalMove(e) {
  e.stopPropagation();
  e = e || window.event;
  dragEndVarY = e.targetTouches[0].screenY;
}

function dragVerticalEnd(e) {
  e.stopPropagation();
  e = e || window.event;
  if( dragStartVarY > dragEndVarY ) {

    if ( topWrapper > -( heightItem * (countVerticalItem - 1) ) ) {
      slideUp();
    }

  } else {

    if ( topWrapper != 0 ) {
      slideDown();
    }

  }
  // удаление обработчика движения пальца
  // как я понял, для этого события, разницы особо нет:
  // повесить обработчик сразу глобально или в функциях и удалять
  // но всё же оставлю так
  // мысль была о том, чтобы экономить ресурсы
  carousel.removeEventListener('touchmove', dragVerticalMove);
}

// третий вертикальный слайд, он же первый горизонтальный
// использовать <input type="range"> не вышло из-за плохой кастомизации и невозможности
// толковой настройки. Пишу свой рэндж с анимациями и кастомизацией
let range = document.querySelector('.range');
let widthRange = range.offsetWidth;     // ширина горизонтального слайдера
let countHorizontalItem = document.querySelectorAll('.horizontal-carousel-item').length;
let betweenRangeItems = Math.floor(widthRange / countHorizontalItem); // расстрояние между слайдами на слайдере
let thumb = document.querySelector('.thumb');

let x, x1;

let zoneOfSlide; // зона на слайдере, в которой не просиходит переключение слайдов
let oldZone = 0;
let newZone = 0;

function scrollMove(e) {
  let x2 = e.pageX;
  let thumbLeft = Math.min(range.offsetWidth - thumb.offsetWidth, Math.max(-1, x + x2 - x1));

  thumbLeft = Math.min(range.offsetWidth - thumb.offsetWidth, Math.max(-1, x + x2 - x1));

  if ( (thumbLeft >= 0) && (thumbLeft < range.offsetWidth) ) {
    thumb.style.left = thumbLeft + 'px';
  }

  newZone = Math.floor(thumb.style.left.slice(0, -2) / betweenRangeItems);

  if (newZone != oldZone) {
    slideRight(newZone);
  }

  oldZone = newZone;
}

let leftWrapper = 0; // начальное положение контенера со сладйами
let activeItemHor = 0; // номер видимого слайда
let widthItem = document.querySelector('.horizontal-carousel-item').offsetWidth;
let wrapperItemHor = document.querySelector('.test');

function slideRight(zone) {
  leftWrapper = -widthItem * zone;
  wrapperItemHor.style.left = leftWrapper + 'px';
}

thumb.addEventListener('mousedown', function(e) {
  thumb.style.transition = '0s all';
  x = thumb.offsetLeft;
  x1 = e.pageX;
  document.addEventListener('mousemove', scrollMove);

  document.addEventListener('mouseup', function(e) {
    document.removeEventListener('mousemove', scrollMove);
    setThumb();
  });
});
// в лисе в режиме адаптации не работает, надо потестировать на тачскрине реальном
thumb.addEventListener('touchstart', function(e) {
  e.stopPropagation();
  x = thumb.offsetLeft;
  x1 = e.pageX;
  document.addEventListener('touchmove', scrollMove);

  document.addEventListener('touchend', function(e) {
    document.removeEventListener('touchmove', scrollMove);
    setThumb();
  });
});

function setThumb() {
  thumb.style.transition = '0.2s all';
  switch(oldZone) {
    case 0:
      thumb.style.left = '-13px';
    break;

    case (countHorizontalItem - 1):
      thumb.style.left = widthRange - 30 + 'px';
    break;

    default:
      thumb.style.left = oldZone * betweenRangeItems + betweenRangeItems/2 - 22 + 'px';
    break;
  }
}
