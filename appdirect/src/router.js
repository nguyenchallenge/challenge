var $        = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

// VIEW
import { HomeView } from './views/HomeView';
import { HeaderView } from './views/HeaderView';

class Router extends Backbone.Router {

  constructor () {
    window.isDefaultPageViewed = false;

    this.routes = {
      "": "defaultAction",
      "home": "defaultAction",
      '*actions': 'defaultAction'
    };

    new HeaderView().render();

    super();
  }

  defaultAction () {
    window.isDefaultPageViewed = true;
    this.showView(HomeView);
  }

  showView (MyView) {
    if (!window.isDefaultPageViewed) {
      window.app_router.navigate('/', true);
      return false;
    }

    if (window.previousView && window.previousView.clean)
    {
      window.previousView.clean();
    }

    var view = new MyView();

    window.previousView = view;
    view.render();

    window.isDefaultPageViewed = true;
  }
}

export { Router };
