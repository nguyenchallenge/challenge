var Backbone         = require('Backbone'),
    $                = require('jquery'),
    Handlebars       = require('handlebars'),
    template         = require('../../templates/headerTemplate.hbs', 'utf8')();

Backbone.$ = $;

class HeaderView extends Backbone.View {
  constructor () {
    this.el = $("header");

    super();
  }

  initialize () {
  }

  render () {
    var compiledTemplate = Handlebars.compile(template);
    this.$el.html( compiledTemplate() );
  }

  clean () {
    $(this.el).empty();
    this.unbind();
    this.undelegateEvents();
  }

}

export { HeaderView };
