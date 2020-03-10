'use strict';

export default class horizontalCarousel {
  constructor () {
    this.carousel = document.querySelector('.carousel');
    this.range = document.querySelector('.rangeThumb');
    this.widthRange = 716;
    this.countHorizontalItem = document.querySelectorAll('.horizontal-carousel-item').length;
    this.betweenRangeItems = Math.floor( (this.widthRange / this.countHorizontalItem) );
    this.thumb = document.querySelector('.thumb');
    this.widthItem = 1024;
    this.wrapperItemHor = document.querySelector('.test');
    this.rangeColor = document.querySelector('.color-range');
    this.x = 0;
    this.x1 = 0;
    this.oldZone = 0;
    this.newZone = 0;
    this.leftWrapper = 0;
    this.activeItemHor = 0;

    this._addTouchStartEvent();
    this._addTouchMoveEvent();
    this._addTouchEndEvent();
  }

  _addTouchStartEvent() {
    document.addEventListener( 'touchstart', e => {
      this.thumb.style.transition = 'all 0s';
      this.rangeColor.style.transition = 'all 0s';
      this.x = this.thumb.offsetLeft;
      this.x1 = e.changedTouches[0].pageX;
    });
  }

  _addTouchMoveEvent() {
    document.addEventListener( 'touchmove', e => {
      e.stopPropagation();
      let x2 = e.changedTouches[0].pageX;
      let thumbLeft = Math.min( this.range.offsetWidth - this.thumb.offsetWidth, Math.max(-1, this.x + x2 - this.x1));

      if ( ( thumbLeft >= 0) && ( thumbLeft < this.range.offsetWidth ) ) {
        this.thumb.style.left = thumbLeft + 'px';
        this.rangeColor.style.width = thumbLeft + 22 + 'px';
      }
      this.newZone = Math.floor( (this.thumb.style.left.slice(0, -2) / this.betweenRangeItems) );

      if ( ( this.newZone != this.oldZone ) && ( this.newZone >= 0 ) ) {
        this.leftWrapper = -(this.widthItem) * this.newZone;
        this.wrapperItemHor.style.left = this.leftWrapper + 'px';
      }

      if (this.newZone >= 0) this.oldZone = this.newZone;
      console.log(this.newZone);
    });
  }

  _addTouchEndEvent() {
    document.addEventListener( 'touchend', e => {
    this.rangeColor.style.transition = 'all 0.2s';
    this.thumb.style.transition = 'all 0.2s';
    switch(this.oldZone) {
      case 0:
        this.thumb.style.left = '-22px';
        this.rangeColor.style.width = '0px';
      break;

      case (this.countHorizontalItem - 1):
        this.thumb.style.left = this.widthRange - 30 + 'px';
        this.rangeColor.style.width = this.widthRange + 'px';
      break;

      default:
        this.thumb.style.left = this.oldZone * this.betweenRangeItems + this.betweenRangeItems/2 - 22 + 'px';
        this.rangeColor.style.width = this.oldZone * this.betweenRangeItems + this.betweenRangeItems/2 + 'px';
      break;
    }
  });
  }
}