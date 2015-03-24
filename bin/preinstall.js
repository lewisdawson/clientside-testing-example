var fs = require('fs'),
	jqueryFilePath;

jqueryFilePath = __dirname + '/../src/main/webapp/lib/jquery.min.js';

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