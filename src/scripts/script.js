'use strict';

// import thumb from 'thumb.js';
import VerticalCarousel from './verticalCarousel.js';
class App {
  constructor () {
    this.body = document.querySelector('body');
  }

  run() {
    try {
      // new thumb();
      new VerticalCarousel();
    } catch (err) {
      console.log('core-error', `App run`);
      console.log(err);
    }
  }
}

let app = new App();

{
  app.run();
}