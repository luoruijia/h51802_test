//引入模块
const gulp = require("gulp"),
	minifyCss = require("gulp-clean-css"),
	babel = require("gulp-babel"),
	uglify = require("gulp-uglify"),
	sass = require("gulp-sass");
	
//定制任务：压缩css
gulp.task("css",function(){
	gulp.src("./gouwuche/**/*.css")
	.pipe(minifyCss())
	.pipe(gulp.dest("./dist/"));
});

//定制任务：压缩js
gulp.task("js",function(){
	gulp.src("./gouwuche/js/**/*.js")
	.pipe(babel({
		presets:['env']
	}))
	.pipe(uglify())
	.pipe(gulp.dest("./dist/js/"));
});

//定制任务编译scss
gulp.task("sass",function(){
	gulp.src("./gouwuche/sass/*.scss")
	
	.pipe(sass({outputStyle:"compressed"}))
	.pipe(gulp.dest("./dist/css/"));
});