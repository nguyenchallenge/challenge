require('../plugins/dragndrop');

var Backbone         = require('backbone'),
    $                = require('jquery'),
    _                = require('lodash'),
    Handlebars       = require('handlebars'),
    template         = require('../../templates/homeTemplate.hbs', 'utf8')(),
    TwitterCol       = require('../collections/twitter/twitterCollection'),
    moment           = require('moment'),
    utils            = require('../utils/utils')();

class HomeView extends Backbone.View {

  constructor () {
    $('body').attr('class', 'home');
    this.el = $(".container");

    this.events = {
      'click .edit': 'toggleEdit'
    };

    super();
  }

  initialize () {
    Handlebars.registerHelper('humanReadingDate', function(created_at) {
      return moment(created_at).format("MMM Do YYYY");
    });

    Handlebars.registerHelper('parseUrl', function(text) {
      return utils.addAnchorTagToHttp(text);
    });

    this.getTweets();
  }

  getTweets () {
    var self = this;
    var twitterCol = new TwitterCol.TwitterCollection();
    this.col = twitterCol.fetch().done(function (){
      self.render();
    });
  }

  render () {
    var self = this;

    if (this.col && this.col.responseJSON) {
      self.col.responseJSON = this.reorderList(self.col.responseJSON);

      var compiledTemplate = Handlebars.compile(template);
      this.$el.html( compiledTemplate({data: self.col.responseJSON}) );

      this.afterRender();
    }
  }

  afterRender () {
    this.dragdrop = $('.container-tweets').dragdrop();
  }

  reorderList (collection) {
    return _.sortBy(collection, function(el){
      return localStorage.getItem(el.name);
    });
  }

  toggleEdit () {
    var container = document.querySelector('.container');

    if (container.classList.contains('editable')) {
      this.dragdrop.off();
    } else {
      this.dragdrop.on();
    }

    container.classList.toggle('editable');
  }

  clean () {
    $(this.el).empty();
    this.unbind();
    this.undelegateEvents();
    this.unbindEvents();
    this.dragdrop.off();
  }

}

export { HomeView };
