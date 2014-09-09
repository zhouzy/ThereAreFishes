module.exports = function (grunt) {
    // grunt 组件
    grunt.loadNpmTasks('grunt-contrib-less'); // 合并压缩 less 文件
    grunt.loadNpmTasks('grunt-contrib-concat'); // 合并 js 文件
    grunt.loadNpmTasks('grunt-contrib-uglify'); // 压缩 js 文件
    grunt.loadNpmTasks('grunt-contrib-watch'); // 动态执行任务

    // 配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // 合并压缩 less 文件
        // 文档 https://github.com/gruntjs/grunt-contrib-less
        less: {
            development: {
                options: {
                    yuicompress: false
                },
                files: {
                    "public/stylesheets/common.css": "public/stylesheets/common.less",
                    "public/stylesheets/index.css": "public/stylesheets/index.less",
                    "public/stylesheets/activity.css": "public/stylesheets/activity.less",
                    "public/stylesheets/nav.css": "public/stylesheets/nav.less"
                }
            },
            production: {
                options: {
                    yuicompress: true
                },
                files: {
                    "public/stylesheets/common.css": "public/stylesheets/common.less",
                    "public/stylesheets/index.css": "public/stylesheets/index.less",
                    "public/stylesheets/activity.css": "public/stylesheets/activity.less"
                }
            }
        },
        // 合并 js 文件
        // 文档 https://github.com/gruntjs/grunt-contrib-concat
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                // 这里放需要合并的文件
                src: [
                    'public/javascripts/func/nav.js',
                    'public/javascripts/func/utils.js',
                    'public/javascripts/func/index.js'
                ],
                dest: 'public/javascripts/func/main.js'
            }
        },
        // 压缩 js 文件
        // 文档 https://github.com/gruntjs/grunt-contrib-uglify
        uglify: {
            build: {
                files: {
                    // concat 任务合并后的文件路径 可同名
                    'public/javascripts/func/main.min.js': ['public/javascripts/func/main.js']
                }
            }
        },

        // 监控文件变化并动态执行任务
        // 文档 https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            scripts: {
                files: ['public/javascripts/**/*.js'],
                tasks: ['concat']
            },
            less: {
                files: 'public/stylesheets/*.less',
                tasks: ['less']
            }
        }
    });

    // 开发环境不压缩 可调用 `grunt dev`
    grunt.registerTask('dev', ['concat', 'uglify', 'less:development']);
    // 生产环境压缩 可调用 `grunt pro`
    grunt.registerTask('pro', ['concat', 'uglify']);
    // 注册以外部调用 `grunt`
    grunt.registerTask('default', ['dev']);
};