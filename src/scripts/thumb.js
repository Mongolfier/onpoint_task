'use strict';

export default class thumb {
  constructor () {
    this._setThumb(zone);
  }

  _setThumb (oldZone) {
    switch(oldZone) {
      case 0:
        thumb.style.left = '-25px';
      break;

      case (countHorizontalItem - 1):
        thumb.style.left = widthRange - 30 + 'px';
      break;

      default:
        thumb.style.left = oldZone * betweenRangeItems + betweenRangeItems/2 - 22 + 'px';
      break;
    }
    thumb.style.transition = 'all 0.2s';
  }
}