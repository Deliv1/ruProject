var gulp = require("gulp"),
	watch = require("gulp-watch"),
	less = require("gulp-less"),
	concat = require("gulp-concat"),
	rename = require("gulp-rename"),
	autoprefixer = require("gulp-autoprefixer"),
	cleanCss = require("gulp-clean-css"),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	uglify = require("gulp-uglify");


	var path = {
		html: "index.html",
		styles: {
			traking:  ["node_modules/bootstrap/dist/css/bootstrap.css",
						"styles/*.less"],
			trakingCss: ["build/*.css"],

			css: ["styles"],
			dest: ["styles/"],
			reprocessed: ["build"]
		}
	}


	gulp.task("html", function() {
		return gulp.src(path.html)
		.pipe(reload({stream: true}))
	});


	gulp.task("less", function() {
		return gulp.src(path.styles.traking)
		.pipe(concat("styles.less"))
		.pipe(less(path.styles.dest))
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(rename(path.styles.css + ".css"))
		.pipe(gulp.dest("build"))
		//.pipe(cleanCss())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest("build"))
	});

	gulp.task("css", function() {
		return gulp.src(path.styles.trakingCss)
		.pipe(reload({stream: true}))
	});

	gulp.task('browserSync', function() {
	  browserSync({
	    server: {
	      baseDir: "./"
	    },
	    port: 3232,
	    open: true,
	    notify: false
	  });
	});	
	gulp.task("watcher", function() {
		gulp.watch(path.html, ["html"])
		gulp.watch(path.styles.trakingCss, ["css"])
		gulp.watch(path.styles.traking, ["less"])

	});

	gulp.task("default", ["watcher", "browserSync"])

