module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/* <%= pkg.name %> - A bookmarklet for web browser to kill rude advertisement\n * @author kikoshoung\n * last modified at <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %>\n */\n',
                beautify: {
                    ascii_only: true
                }
            },
            dist: {
                files: {
                    'minified/ad-killer-install.min.js': 'js/ad-killer-install.js',
                    'minified/ad-killer.min.js': 'js/ad-killer.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', 'uglify');
}; 