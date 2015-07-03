
module.exports = function(grunt) {

	//Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		bower_concat : {
			all : {
				dest : 'dist/vendor/bower.js',
				mainFiles : {
					'angular' : 'angular.js',
					'angular-route' : 'angular-route.js',
					'jquery' : 'src/jquery.js',
					'bootstrap' : 'dist/js/bootstrap.js'
				}
			}
		},
		uglify : {
			bower : {
				options : {
					mangle : true,
					compress : true
				},
				files : {
					'dist/vendor/bower.min.js' : 'dist/vendor/bower.js'
				}
			},
			app : {
				files : {
					'dist/js/angular-app.min.js' : 'dist/js/angular-app.js'
				}
			}
		},

		jshint : {
			app : {
				options: {
    				reporter: require('jshint-stylish')
				},
				beforeconcat : ['src/**/*.js'],
				afterconcat : ['dist/js/angular-app.js']
			}
		},

		concat : {
			app : {
				src : ['app1.js', 'src/**/*.js'],
				dest : 'dist/js/angular-app.js'
			},
			styles : {
				src : ['src/**/*.css'],
				dest : 'dist/css/styles.css'
			}
		},
		htmlmin : {
			templates : {
				options : {
					removeComments : true,
					collapseWhiteSpace : true
				},
				files : {
					'dist/templates/*.html' : 'src/templates/*.html',
					'dist/partials/*.html' : 'src/partials/*.html'
				}
			}
		},

		ngtemplates : {
			//mainApp - moduleName
			mainApp  : {
				options : {
					htmlmin: {
					  collapseBooleanAttributes:      true,
					  collapseWhitespace:             true,
					  removeAttributeQuotes:          true,
					  removeComments:                 true, // Only if you don't use comment directives! 
					  removeEmptyAttributes:          true,
					  removeRedundantAttributes:      true,
					  removeScriptTypeAttributes:     true,
					  removeStyleLinkTypeAttributes:  true
					}					
				},
				cwd : 'src',
				src : ['templates/*.html', 'partials/*.html'],
				dest : 'dist/js/templates.js'
			}
			
		},
		cssmin : {			
			minify : {
				src : 'dist/css/styles.css',
				dest : 'dist/css/styles.min.css'
			}
		},
		
		connect: {
		    server: {
		      options: {
		        port: 8000,
		        keepalive : true,
		        hostname : 'localhost',
		        base: {
		          path : '.',
		          options: {
		            index: 'index5.html',
		            maxAge: 300000
		          }
		        }
		      }
		    }
  		} 		

	});

	grunt.registerTask('default', ['bower_concat', 'concat', 'jshint',
  		 'uglify', 'ngtemplates', 'cssmin', 'connect']);

}