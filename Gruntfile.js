module.exports = function (grunt) {
  grunt.initConfig({
    clean: ['./lib'],
    ts: {
      default: {
        tsconfig: './tsconfig.json'
      }
    },
    copy: {
        main: {
            expand: true,
            cwd: 'src/',
            src: '**/*.md',
            dest: 'lib/'
        },
      }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['clean', 'ts', 'copy']);
}
