module.exports = {
  options: {
    debug: true,
    sourceMaps: true,
    transform: [
      [
        "hbsfy",
        {
          "precompilerOptions": {
            "noescape": true
          }
        }
      ]
    ],
    browserifyOptions: {
      debug: true,
      sourceMaps: true
    }
  },
  js: {
    src: './js/main.js',
    dest: './js/bundle.js'
  }
};
