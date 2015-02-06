module.exports = {
  development: {
    options: {
      namespace: 'MyApp.Templates',
      processName: function(filePath) {
        return filePath.replace(/^templates\//, '').replace(/\.hbs$/, '');
      }
    },
    files: {
      "js/templates.js": ["templates/**/*.hbs"]
    }
  }
};
