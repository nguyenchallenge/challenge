module.exports = {
  less: {
    files: ['less/*'],
    tasks: ['less']
  },
  es: {
    files: ['src/**/*.js'],
    tasks: ['traceur']
  },
  js: {
    files: ['js/**/*.js', 'templates/**/*.hbs'],
    tasks: ['browserify']
  }
};
