module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %> */\n'
            },
            dist: {
                files: {
                    'minified/ad-killer-install.js': 'js/ad-killer-install.js',
                    'minified/ad-killer.js': 'js/ad-killer.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', 'uglify');
}; 