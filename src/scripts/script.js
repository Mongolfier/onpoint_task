'use strict';

import verticalCarousel from './verticalCarousel.js';
import horizontalCarousel from './horizontalCarousel.js';
class App {
  constructor () {
  }

  run() {
    try {
      new verticalCarousel();
      new horizontalCarousel();
    } catch (err) {
      console.log('core-error', `App run`, err);
    }
  }
}

let app = new App();

{
  app.run();
}