var $        = require('jquery'),
    Backbone = require('backbone');

import { Router } from './router';

Backbone.$ = $;

class App {
  constructor () {
    window.app_router = new Router();
    Backbone.history.start();
    Backbone.history.on("route");
  }
}

export { App };
