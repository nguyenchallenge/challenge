var Backbone = require('Backbone'),
    _        = require('lodash'),
    config   = require('../../config/config')();

class TwitterCollection extends Backbone.Collection {
  constructor(options) {
    this.options = options || {};
    super(options);
    this.url = config.twitter.url;
  }

  getTweets(attributes, options) {
    this.getData(config.twitter.url, 'get', attributes, options);
  }

  getData (url, type, attributes, options) {
    options = _.defaults((options || {}), {
      url: url,
      type: type,
      contentType: 'application/json'
    });
    return Backbone.Model.prototype.save.call(this, attributes, options);
  }
}

export { TwitterCollection };
