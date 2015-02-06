var utils = function () {

  var utils = {
    addAnchorTagToHttp: function (text) {
      return text.replace(/(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z09+&@#\/%=~_|])/img, '<a href="$1" target="_blank">$1</a>');
    }
  };

  return utils;

};

module.exports = utils;
