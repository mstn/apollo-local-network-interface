'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    tslint: {
      options: {
        configuration: grunt.file.readJSON('tslint.json')
      },
      files: {
        src: [
          'src/**/*.ts',
          'test/**/*.ts',
          '!test/fixtures/**/*.ts'
        ]
      }
    }
  })

  grunt.loadNpmTasks('grunt-tslint');
}
