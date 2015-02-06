module.exports = {
  options: {
    modules: "commonjs"
  },
  custom: {
    files: [{
      expand: true,
      cwd: 'src',
      src: ['**/*.js'],
      dest: 'js/'
    }]
  },
};
