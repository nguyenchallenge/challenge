require('traceur/bin/traceur-runtime');

var $ = require('jquery');

import { App } from './app';

$(() => {
  'use strict';

  new App();
});
