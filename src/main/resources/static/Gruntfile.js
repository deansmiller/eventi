module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ["Gruntfile.js", "src/**/*.js", "test/**/*.js"],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        concat: {
            dist: {
                src: [
                    "app/src/**/*.js"
                ],
                dest: "app/build/js/main.js"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-concat");

    grunt.registerTask("default", ["jshint", "concat"]);

};