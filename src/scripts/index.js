import '../styles/index.scss';

"use strict";

let carousel = document.querySelector('.carousel');
let wrapperItem = document.querySelector('.vertical-carousel-wrapper');
let heightItem = document.querySelector('.vertical-carousel-item').offsetHeight;
let countVerticalItem = document.querySelectorAll('.vertical-carousel-item').length;
let dots; //

let topWrapper = 0;
let activeItem = 0;

(function makeSpan() {
  for (let i = 0; i < countVerticalItem; i++) {
    let newSpan = document.createElement('span');
    document.querySelector('.dots').appendChild(newSpan);
  }
  dots = document.querySelectorAll('span');
  document.querySelector('span').setAttribute('class', 'active');
})();

carousel.addEventListener('wheel', function(e) {
  e = e || window.event;
  e.preventDefault();

  if (e.deltaY > 0) {

    if ( topWrapper > -( heightItem * (countVerticalItem - 1) ) ) {
      slideUp();
    }

  } else {

    if ( topWrapper != 0 ) {
      slideDown();
    }

  }
});

carousel.addEventListener('touchstart', dragVerticalStart);
carousel.addEventListener('touchend', dragVerticalEnd);

function slideUp() {
  topWrapper += -heightItem;
  wrapperItem.style.top = topWrapper + 'px';
  activeItem = -(topWrapper / heightItem);
  dots[activeItem-1].classList.remove('active');
  dots[activeItem].classList.add('active');
}

function slideDown() {
  topWrapper -= -heightItem;
  wrapperItem.style.top = topWrapper + 'px';
  activeItem = -(topWrapper / heightItem);
  dots[activeItem+1].classList.remove('active');
  dots[activeItem].classList.add('active');
}

let dragStartVarY = 0;
let dragEndVarY = 0;

function dragVerticalStart(e) {
  e = e || window.event;
  e.stopPropagation();

  carousel.addEventListener('touchmove', dragVerticalMove);

  dragStartVarY = e.targetTouches[0].screenY;
}

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
  carousel.removeEventListener('touchmove', dragVerticalMove);
}

let range = document.querySelector('.range');
let widthRange = range.offsetWidth;
let countHorizontalItem = document.querySelectorAll('.horizontal-carousel-item').length;
let betweenRangeItems = Math.floor(widthRange / countHorizontalItem);
let thumb = document.querySelector('.thumb');

let x, x1;

let zoneOfSlide;
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

let leftWrapper = 0;
let activeItemHor = 0;
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
