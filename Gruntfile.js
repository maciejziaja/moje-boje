/*global module:false*/
module.exports = function(grunt) {
'use strict';

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        config: {
            base: '.',
            src: {
                dir:   '<%= config.base %>/assets',
                js:    '<%= config.src.dir %>/js',
                tests: '<%= config.src.js %>/tests',
                css:   '<%= config.src.dir %>/css',
                img:   '<%= config.src.dir %>/img',
                fonts: '<%= config.src.dir %>/fonts',
                tmp:   '<%= config.src.dir %>/tmp'
            },
            dest: {
                dir:   '<%= config.base %>/web',
                js:    '<%= config.dest.dir %>/js',
                css:   '<%= config.dest.dir %>/css',
                img:   '<%= config.dest.dir %>/img',
                fonts: '<%= config.dest.dir %>/fonts'
            }

        },
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['<%= config.src.js %>/**/*.js'],
                dest: '<%= config.src.tmp %>/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: '<%= config.dest.js %>/<%= pkg.name %>.min.js'
            }
        },
        jshint:{
            options: {
                  jshintrc: true
            },
            gruntfile: {
                options: {
                    //reporter: 'checkstyle',
                    //reporterOutput: '<%= config.src.tmp %>/jshint_checkstyle.xml'
                },
                src: '<%= config.base %>/Gruntfile.js'
            },
            lib_test: {
                options: {
//                    reporter: 'jslint',
//                    reporterOutput: '<%= config.src.tmp %>/jshint_jslint.xml'
                },
                src: ['<%= config.src.js %>/**/*.js', '<%= config.src.tests %>/**/*.js']
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'qunit']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', [
        'jshint',
//        'qunit',
        'concat',
        'uglify'
    ]);

};
