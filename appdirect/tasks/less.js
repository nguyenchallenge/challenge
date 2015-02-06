module.exports = {
  development: {
    files: [{
              expand: true,
              cwd: 'less',
              src: ['all.less'],
              dest: 'css',
              ext: '.css'
            }]
      },
      build: {
        files: [{
                expand: true,
                cwd: 'less',
                src: ['all.less'],
                dest: 'css',
                ext: '.css'
              }]
      }
}
