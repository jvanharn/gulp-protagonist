'use strict';

var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var through = require('through2');
var protagonist = require('protagonist');


module.exports = function (options) {
	options = options || { type: 'refract' };

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
		}

		if (file.isStream()) {
			return this.emit('error', new PluginError('gulp-protagonist',  'Streaming not supported'));
		}

		var self = this;

		protagonist.parse(file.contents.toString(), { type: options.type }, function (error, result) {
			if (error) {
				return cb(new PluginError('gulp-protagonist', '(' + file.path + ') ' + error.message));
			}

			try {
				var newfile = new gutil.File({
					base: file.base,
					cwd: file.cwd,
					path: gutil.replaceExtension(file.path, '.' + (options.format || 'json')),
					contents: new Buffer(JSON.stringify(result, null, 2))
				});

				self.push(newfile);

				cb();
			} catch (e) {
				cb(new PluginError('gulp-protagonist', '(' + file.path + ') ' + e.message));
			}
		});
	});
};
