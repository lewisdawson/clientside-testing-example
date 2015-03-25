var fs = require('fs'),
	path = require('path'),
	libDirPath,
	jqueryFilePath;

libDirPath = path.join(__dirname, '../src/main/webapp/lib');
jqueryFilePath = path.join(libDirPath, 'jquery.min.js');

fs.exists(jqueryFilePath, function (exists) {
	if(exists) {
		fs.unlink(jqueryFilePath, function(err) {
			if(err) {
				throw err;
			}
			console.log('Successfully deleted jquery.min.js!');
		});
	}
});