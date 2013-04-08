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
                    'minified/ad-killer-boot.min.js': 'js/ad-killer-boot.js',
                    'minified/ad-killer.min.js': 'js/ad-killer.js',
                    'minified/ad-killer-all.min.js': 'js/ad-killer-all.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', 'uglify');
}; 