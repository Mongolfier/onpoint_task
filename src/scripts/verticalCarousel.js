'use strict';

export default class verticalCarousel {
  constructor () {
    this.carousel = document.querySelector('.carousel');
    this.wrapperItem = document.querySelector('.vertical-carousel-wrapper');
    this.heightItem = document.querySelector('.vertical-carousel-item').offsetHeight;
    this.countVerticalItem = document.querySelectorAll('.vertical-carousel-item').length;
    this.topWrapper = 0;
    this.activeItem = 0;
    this.dragStartVarY = 0;
    this.dragEndVarY = 0;

    this._makeSpan();
    this._addWheelEvent();
    this._addTouchStartEvent();
    this._addTouchMoveEvent();
    this._addTouchEndEvent();
    this._slideUp();
    this._slideDown();
  }

  _makeSpan () {
    for (let i = 0; i < this.countVerticalItem; i++) {
      let newSpan = document.createElement('span');
      document.querySelector('.dots').appendChild(newSpan);
    }
    document.querySelector('span').setAttribute('class', 'active');
  }

  _addWheelEvent () {
    this.carousel.addEventListener('wheel', e => { 
      e = e || window.event;
      e.preventDefault();

      if (e.deltaY > 0) {
        if ( this.topWrapper > -( this.heightItem * ( this.countVerticalItem - 1 ) ) ) {
          this._slideUp();
        }
      } else {
        if ( this.topWrapper != 0 ) {
          this._slideDown();
        }
      }

    });
  }

  _addTouchStartEvent () {
    this.carousel.addEventListener('touchstart', e => {
      this.dragEndVarY = e.targetTouches[0].screenY;
    });
  }

  _addTouchMoveEvent () {
    this.carousel.addEventListener('touchmove', e => {
      this.dragEndVarY = e.targetTouches[0].screenY;
    });
  }

  _addTouchEndEvent () {
    this.carousel.addEventListener('touchend', e => {
      if( this.dragStartVarY > this.dragEndVarY ) {

        if ( this.topWrapper > -( this.heightItem * ( this.countVerticalItem - 1 ) ) ) {
          this._slideUp();
        }
      } else {

        if ( this.topWrapper != 0 ) {
          this._slideDown();
        }
      }
    });
  }

  _slideUp () {
    this.topWrapper += -this.heightItem;
    this.wrapperItem.style.top = this.topWrapper + 'px';
    this.activeItem = -( this.topWrapper / this.heightItem);
    document.querySelectorAll('span')[this.activeItem-1].classList.remove('active');
    document.querySelectorAll('span')[this.activeItem].classList.add('active');
  }

  _slideDown () {
    this.topWrapper -= -this.heightItem;
    this.wrapperItem.style.top = this.topWrapper + 'px';
    this.activeItem = -(this.topWrapper / this.heightItem);
    document.querySelectorAll('span')[this.activeItem+1].classList.remove('active');
    document.querySelectorAll('span')[this.activeItem].classList.add('active');
  }
}

export let carousel;