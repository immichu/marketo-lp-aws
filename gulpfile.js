var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var order = require("gulp-order");
var del = require("del");
var fs = require('fs');
var path = require('path');
var panini = require("panini");
var browserSync = require("browser-sync").create();

function bs(done) {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 3000
  });
  done();
}

function clean() {
  return del(['dist/**', '!dist'], { force: true });
}

function pagesData(done) {
  var pagesDir = path.join(__dirname, "src/pages/pages");
  var pagesFile = path.join(__dirname, "src/data/pages.json");
  var dataB = {
    pages: []
  };
  fs.readdir(pagesDir, function (err, files) {
    if (err) throw err;
    files.forEach(function (file, index) {
      var fileName = file.split('.')[0];
      dataB.pages.push({
        "pageName": fileName
      });
    });
    fs.writeFile(pagesFile, JSON.stringify(dataB, null, 2), (err) => {
      if (err) throw err;
      console.log('Pages list created!');
    });
  });
  done();
}

function copyHTML(done) {
  panini.refresh();
  gulp.src("src/pages/**/*.html")
    .pipe(
      panini({
        root: "src/pages",
        layouts: "src/layouts",
        partials: "src/partials",
        data: "src/data"
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
  done();
}

function copyJS(done) {
	gulp.src("src/assets/js/*.js")
		.pipe(sourcemaps.init())
		.pipe(order([
			'jquery.min.js',
			'bootstrap.bundle.min.js',
			'sap-on-aws.js'
		]))
		.pipe(concat('sap-on-aws.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest("dist/js"))
		.pipe(browserSync.stream());
	done();
}

function compileSASS(done) {
	gulp.src("src/assets/sass/*.scss")
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
  done();
}

function watch() {
  gulp.watch("src/assets/sass/*.scss", compileSASS);
  gulp.watch("src/assets/js/*.js", copyJS);
  gulp.watch(["src/pages/*.html", "src/layouts/*.html", "src/partials/*.html", "src/data/*.json"], copyHTML);
  gulp.watch("src/pages/**/*.html", pagesData);
}

gulp.task('default', gulp.series(clean, pagesData, gulp.parallel(copyHTML, copyJS, compileSASS, watch, bs)));
