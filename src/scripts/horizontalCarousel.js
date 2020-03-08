'use strict';

export default class horizontalCarousel {
  constructor () {
    this.carousel = document.querySelector('.carousel');
    this.range = document.querySelector('.range');
    this.widthRange = this.range.offsetWidth;
    this.countHorizontalItem = document.querySelectorAll('.horizontal-carousel-item').length;
    this.betweenRangeItems = Math.floor( this.widthRange / this.countHorizontalItem );
    this.thumb = document.querySelector('.thumb');
    this.widthItem = document.querySelector('.horizontal-carousel-item').offsetWidth;
    this.wrapperItemHor = document.querySelector('.test');
    this.x;
    this.x1;
    this.zoneOfSlide;
    this.oldZone = 0;
    this.newZone = 0;
    this.leftWrapper = 0;
    this.activeItemHor = 0;

    this._addMouseDownEvent();
    this._addMouseMoveEvent();
    this._addMouseUpEvent();

    this._addTouchStartEvent();
    this._addTouchMoveEvent();
    this._addTouchEndEvent();

    this._setThumb();
    this._slideRight();
  }

  _addMouseDownEvent() {
    this.thumb.addEventListener('mousedown', e => {
      this.thumb.style.transition = 'all 0s';
      this.x = this.thumb.offsetLeft;
      this.x1 = e.pageX;
    });
  }

  _addMouseMoveEvent() {
    document.addEventListener( 'mousemove', e => {
      let x2 = e.pageX;

      if( e.pageX === undefined ) x2 = e.changedTouches[0].pageX;

      let thumbLeft = Math.min( this.range.offsetWidth - this.thumb.offsetWidth, Math.max(-1, this.x + x2 - this.x1));

      if ( ( thumbLeft >= 0) && ( thumbLeft < this.range.offsetWidth ) ) {
        this.thumb.style.left = thumbLeft + 'px';
      }

      this.newZone = Math.floor( this.thumb.style.left.slice(0, -2) / this.betweenRangeItems );

      if ( ( this.newZone != this.oldZone ) && ( this.newZone >= 0 ) ) {
        this._slideRight();
      }

      if(this.newZone >= 0) this.oldZone = this.newZone;
    });
  }

  _addMouseUpEvent() {
    document.addEventListener( 'mouseup', e => {
      document.removeEventListener( 'mousedown', function() {});
      this._setThumb();
    });
  }

  _addTouchStartEvent() {
    this.thumb.addEventListener( 'touchstart', e => {
      e.stopPropagation();
      this.carousel.removeEventListener( 'touchend', e => {});

      this.thumb.style.transition = 'all 0s';
      this.x = this.thumb.offsetLeft;
      this.x1 = e.changedTouches[0].pageX;
    });
  }

  _addTouchMoveEvent() {
    this.thumb.addEventListener( 'touchmove', e => {
      let x2 = e.pageX;

      if( e.pageX === undefined ) x2 = e.changedTouches[0].pageX;

      let thumbLeft = Math.min( this.range.offsetWidth - this.thumb.offsetWidth, Math.max(-1, this.x + x2 - this.x1));

      if ( ( thumbLeft >= 0) && ( thumbLeft < this.range.offsetWidth ) ) {
        this.thumb.style.left = thumbLeft + 'px';
      }

      this.newZone = Math.floor( this.thumb.style.left.slice(0, -2) / this.betweenRangeItems );

      if ( ( this.newZone != this.oldZone ) && ( this.newZone >= 0 ) ) {
        this._slideRight();
      }

      if(this.newZone >= 0) this.oldZone = this.newZone;
    });
  }

  _addTouchEndEvent() {
    document.removeEventListener( 'touchmove', function () {});
  }

  _setThumb () {
    switch( this.oldZone ) {
      case 0:
        this.thumb.style.left = '-25px';
      break;

      case ( this.countHorizontalItem - 1 ):
        this.thumb.style.left = this.widthRange - 30 + 'px';
      break;

      default:
        this.thumb.style.left = this.oldZone * this.betweenRangeItems + this.betweenRangeItems/2 - 22 + 'px';
      break;
    }
    this.thumb.style.transition = 'all 0.2s';
  }

  _slideRight() {
    this.leftWrapper = -this.widthItem * this.zone;
    this.wrapperItemHor.style.left = this.leftWrapper + 'px';
  }
}