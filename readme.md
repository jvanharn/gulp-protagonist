# [gulp](http://gulpjs.com)-[protagonist](https://github.com/apiaryio/protagonist)

> Gulp snowcrash to create documentation with API Blueprint

This libary is [gulp-snowcrash](https://github.com/4yopping/gulp-snowcrash) with updated dependencies by [nicgordon](https://github.com/nicgordon/gulp-snowcrash) and an updated name to make it more easily findable.

## Usage

Usage only for generating the JSON representation.
```js
var protagonist = require('gulp-protagonist');

gulp.task('docs', function () {
	return gulp.src('./blueprint/**/*.md')
		.pipe(protagonist({ format: 'json' }))
		.pipe(gulp.dest('./_blueprint'));
});
```

Usage if you want to combine this with something like [Blueman](https://github.com/pixelfusion/blueman).
```js
var protagonist = require('gulp-protagonist'),
	exec = require('child_process').exec;

gulp.task('docs:blueprint', function () {
	return gulp.src('./blueprint/blueprint.md')
		.pipe(protagonist({ format: 'json' }))
		.pipe(gulp.dest('./_blueprint'));
});
gulp.task('docs:blueman', function(cb){
    exec('blueman convert ./blueprint/blueprint.md --host=http://example.com/api/ --output=./blueprint/blueprint_collection.json', function (err, stdout, stderr) {
        util.log(stdout);
        util.log(stderr);
        cb(err);
    });
});
gulp.task('docs', ['docs:compile', 'docs:blueman']);
```
